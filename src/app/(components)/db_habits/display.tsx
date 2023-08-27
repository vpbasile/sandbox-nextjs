import React, { useState } from "react";
import { TaskInfo, Category } from "./types";

export default function HabitTracker() {
    const initialTasks: TaskInfo[] = [
        { "name": "Strech lower back and legs", "category": "self-care", "complete": false },
        { "name": "Take a walk", "category": "activity", "complete": false },
        { "name": "Meditate", "category": "self-care", "complete": false },
        { "name": "Make a meal", "category": "creativity", "complete": false },
        { "name": "Clean living space", "category": "maintenance", "complete": false },
        { "name": "Draw Something", "category": "creativity", "complete": false },
        { "name": "Learn some Spanish", "category": "learning", "complete": false },
        { "name": "Write something", "category": "creativity", "complete": false },
    ];
    const [taskList, setTaskList] = useState(initialTasks);

    const markTaskComplete = (index: number) => {
        const updatedTasks = [...taskList];
        updatedTasks[index].complete = true;
        setTaskList(updatedTasks);
    };

    const categories: Category[] = ["self-care", "maintenance", "activity", "learning", "creativity"];

    function categoryColor(category: Category): [string, string] {
        switch (category) {
            case "self-care": return ["text-green-500", "bg-green-500"];
            case "maintenance": return ["text-gray-500", "bg-gray-500"];
            case "activity": return ["text-orange-500", "bg-orange-500"];
            case "learning": return ["text-blue-500", "bg-blue-500"];
            case "creativity": return ["text-indigo-500", "bg-indigo-500"];
            default: return ["", ""];
        }
    }

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
                            {taskList.map((task, index) =>
                                task.category === category && !task.complete ? (
                                    <li key={index} className={`flex items-center justify-between text-black ${bgColor}`}>
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
