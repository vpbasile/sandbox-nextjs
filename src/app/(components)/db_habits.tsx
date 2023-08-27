import React, { useState } from "react";
import { unwrapData } from "./dbvb_helpers";

export default function HabitTracker() {

    
    
    let taskKey = 0;
    const initialTasks: TaskInfo[] = categories.map(category => { return ({ "name": "Temporary data", "category": category, "complete": false, "key":++taskKey }) })
    const [dataState, SETdataState] = useState(initialTasks);

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
      // <> Prepare for main return
      // ---------------------------------------------

    //   const dbURL = "http://localhost:8000/habits";
    //   queryDB(dbURL);


    return (
        <div className="habit-tracker">
            <code>Next step: move this to a new repo</code>
            <h1 className="mb-4 text-2xl font-bold">Habits</h1>
            {categories.map((category) => {
                const [color, bgColor] = categoryColor(category);
                return (
                    <div key={category} id={category} className={`mb-4 p-2 rounded-lg w-96`}>
                        <h2 className={`mb-2 text-xl ${color}`}>{category}</h2>
                        <ul>
                            {dataState.map((task, index) =>
                                task.category === category && !task.complete ? (
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
