import React, { useState } from "react";
import { unwrapData } from "./dbvb_helpers";

// ---------------------------------------------
// <> Types
// ---------------------------------------------

type category = { uid: string, title: string, color: string }

export interface TaskInfo {
    name: string;
    category: string;
    complete: boolean;
    key: number;
}

const categoryList: category[] = [
    { uid: "self-care", title: "Self-care", color: "green-500" },
    { uid: "maintenance", title: "Maintenance", color: "gray-500" },
    { uid: "activity", title: "Activity", color: "orange-500" },
    { uid: "learning", title: "Learning", color: "blue-500" },
    { uid: "creativity", title: "Creativity", color: "indigo-500" },
    { uid: "default", title: "Misc", color: "white" }
]

function categoryColor(category: category) {
    return [`text-${category.color}`, `bg-${category.color}`]
}

export default function HabitTracker() {

    let taskKey = 0;
    const spoofData: TaskInfo[] = categoryList.map(category => { return ({ "name": "Temporary data", "category": category.uid, "complete": false, "key": ++taskKey }) })
    const [dataState, SETdataState] = useState(spoofData);

    const markTaskComplete = (index: number) => {
        const updatedTasks = [...dataState];
        updatedTasks[index].complete = true;
        SETdataState(updatedTasks);
    };

    function queryDB(dbURL: string): void {
        const displayString = "Attempting to send query to " + dbURL;
        console.log(displayString);
        fetch(dbURL).then(response => response.json()).then(data => {
            const rows = unwrapData(data);
            SETdataState(rows);
        })
            .catch(error => { console.log(error); });
    }
    // ---------------------------------------------
    // <> Main loop
    // ---------------------------------------------
    // Query the Databse - REUSE
    const dbURL = "http://localhost:8000/habits";
    if (dataState === spoofData) { queryDB(dbURL); }
    // ---------------------------------------------
    // <> Main return
    // ---------------------------------------------


    return (
        <div className="habit-tracker">
            <code>Next step: move this to a new repo</code>
            <h1 className="mb-4 text-2xl font-bold">Habits</h1>
            {categoryList.map((category) => {

                const [color, bgColor] = categoryColor(category);
                const uidCategory = category.uid;
                return (
                    <div key={uidCategory} id={uidCategory} className={`mb-4 p-2 rounded-lg w-96`}>
                        <h2 className={`mb-2 text-xl ${color}`}>{category.title}</h2>
                        <ul>
                            {dataState.map((task, index) =>
                                task.category === category.uid && !task.complete ? (
                                    <li key={index} className={`rounded flex items-center justify-between text-black ${bgColor}`}>
                                        <span className={`p-4 w-96 bg-${color}`}>{task.name}</span>
                                        <button onClick={() => markTaskComplete(index)} className={`mb-2 p-4 rounded-lg ${bgColor}`}>Done</button>
                                    </li>
                                ) : null
                            )}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}
