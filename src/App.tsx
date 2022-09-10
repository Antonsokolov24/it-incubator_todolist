import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"


function App() {
    const todoListTitle = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
    ])
    const [filter, setFilter] =useState<FilterValuesType>("all")


    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(task => task.id !== taskID))
        console.log(tasks)
    }
    const changeFilter = (filter:FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender;
    switch (filter) {
        case "completed":
            tasksForRender = tasks.filter(task => task.isDone)
            break
        case "active":
            tasksForRender = tasks.filter(task => !task.isDone)
            break
        default:
            tasksForRender = tasks
    }

    return (
        <div className="App">
            <Todolist
                title={todoListTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            {/*<Todolist title={"What to buy"}/>*/}
            {/*<Todolist title={"What to read"}/>*/}
        </div>
    );
}

export default App;
