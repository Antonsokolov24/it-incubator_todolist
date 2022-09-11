import React, {FC, PropsWithChildren, useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {keyboardKey} from "@testing-library/user-event";

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist: FC<TodolistPropsType> = (props: PropsWithChildren<TodolistPropsType>) => {
    console.log("Todo")
    const [title, setTitle] = useState<string>("")
    const tasksItems = props.tasks.map((task: TaskType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
    })
    const onClickAddTask = () => {
        title && props.addTask(title)
        setTitle("")
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddTask()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onClickSetFilterAll = () => props.changeFilter("all")
    const onClickSetFilterActive = () => props.changeFilter("active")
    const onClickSetFilterCompleted = () => props.changeFilter("completed")

    //const onClickFilterCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const onClickFilterCreator = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>

                <button onClick={onClickFilterCreator("all")}>All</button>
                <button onClick={onClickFilterCreator("active")}>Active</button>
                <button onClick={onClickFilterCreator("completed")}>Completed</button>
            </div>
        </div>
    );
}
