import React, {FC, PropsWithChildren, useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {keyboardKey} from "@testing-library/user-event";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void

}

export const Todolist: FC<TodolistPropsType> = (props: PropsWithChildren<TodolistPropsType>) => {
    console.log("Todo")
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksItems = props.tasks.length//проверяет длину массива и выводит сообщение если нет тасок
        ? props.tasks.map((task: TaskType) => {
            return (
                <li key={task.id}>
                    <input
                        onChange={(e) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)}//меняем статус выбран/не выбран
                        type="checkbox"
                        checked={task.isDone}/>
                    <span className={task.isDone ? "isDone" : ""}>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id, props.todoListID)}>x</button>
                </li>
            )
        })
        : <span>TaskList is empty</span>


    const onClickAddTask = () => { //добавляет только если есть текст, исключает добавление пробелов
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListID)
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
    const onClickFilterCreator = (filter: FilterValuesType)  => (() => props.changeTodoListFilter(filter, props.todoListID))
    const inputErrorClass = error ? "error" : ""
    const errorMessage = <div style={{color: "green"}}>Title is required!</div>

    return (
        <div>
            <h3>{props.title}
            <button onClick={() => props.removeTodoList(props.todoListID)}>X</button> </h3>
            <div>
                <input
                    value={title} //очищает после ввода ссылаясь на title
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                    className={inputErrorClass}
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
