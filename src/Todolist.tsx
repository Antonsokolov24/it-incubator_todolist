import React, {FC, PropsWithChildren, useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {keyboardKey} from "@testing-library/user-event";

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist: FC<TodolistPropsType> = (props: PropsWithChildren<TodolistPropsType>) => {
    console.log("Todo")
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksItems = props.tasks.length//проверяет длинну массива  и выводит сообщение если нет тасок
        ? props.tasks.map((task: TaskType) => {
            return (
                <li key={task.id}>
                    <input
                        onChange={(e) => props.changeTaskStatus(task.id, e.currentTarget.checked)}//меняем статус выбран/не выбран
                        type="checkbox"
                        checked={task.isDone}/>
                    <span className={task.isDone ? "isDone" : ""}>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>x</button>
                </li>
            )
        })
        : <span>TaskList is empty</span>


    const onClickAddTask = () => { //добавляет только если есть текст, исключает добавление пробелов
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddTask()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false) // снимает состояние ошибки с инпут
        setTitle(e.currentTarget.value)
    }
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
                    value={title} //очищает после ввода ссылаясь на title
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                    className={error ? "error" : ""}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={{color: "green"}}>Title is required!</div>}
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>

                <button
                    className={props.filter === "all" ? "btn-active" : ""}
                    onClick={onClickFilterCreator("all")}
                >All
                </button>
                <button
                    className={props.filter === "active" ? "btn-active" : ""}
                    onClick={onClickFilterCreator("active")}
                >Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-active" : ""}
                    onClick={onClickFilterCreator("completed")}
                >Completed
                </button>
            </div>
        </div>
    );
}
