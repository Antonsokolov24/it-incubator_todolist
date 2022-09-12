import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"


function App() {
    console.log(v1())
    //BLL:
    const todoListTitle = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")


    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID)) //удаляет новую таску
        console.log(tasks)
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks]) //добавляет новую таску
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone} : t)) //фильтрация выбранной таски выбрана не выбрана
    }


    //UI:
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
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
            {/*<Todolist title={"What to buy"}/>*/}
            {/*<Todolist title={"What to read"}/>*/}
        </div>
    );
}

export default App;
