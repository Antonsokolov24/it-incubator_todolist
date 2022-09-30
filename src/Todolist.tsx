import React, {FC, PropsWithChildren, useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {keyboardKey} from "@testing-library/user-event";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, ListItem} from "@mui/material";
import {CheckBox, DeleteForeverTwoTone, HighlightOffTwoTone} from "@mui/icons-material";

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
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

export const Todolist: FC<TodolistPropsType> = (props: PropsWithChildren<TodolistPropsType>) => {
    console.log("Todo")

    const tasksItems = props.tasks.length//проверяет длину массива и выводит сообщение если нет тасок
        ? props.tasks.map((task: TaskType) => {
            const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.todoListID)
            return (
                <ListItem key={task.id} className={task.isDone ? "isDone" : ""} disableGutters={true} divider>
                    <Checkbox
                    size={"small"}
                    color={"primary"}
                    onChange={(e) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)}//меняем статус выбран/не выбран
                    checked={task.isDone}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton color={"primary"}>
                        <DeleteForeverTwoTone onClick={() => props.removeTask(task.id, props.todoListID)}/>
                    </IconButton>
                    {/*<button onClick={() => props.removeTask(task.id, props.todoListID)}>x</button>*/}
                </ListItem>
            )
        })
        : <span>TaskList is empty</span>
    const addTask = (title: string) => props.addTask(title, props.todoListID)


    const onClickFilterCreator = (filter: FilterValuesType) => (() => props.changeTodoListFilter(filter, props.todoListID))
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton>
                    <HighlightOffTwoTone onClick={removeTodoList}/>
                </IconButton>
                {/*<button onClick={removeTodoList}>X</button>*/}
            </h3>
            <AddItemForm addItem={addTask} errorColor={"green"}/>
            <ul style={{listStyle: "none"}}>{/*убирает точки*/}
                {tasksItems}
            </ul>
            <div>

                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    // disableElevation уберет тень
                    onClick={onClickFilterCreator("all")}
                >All
                </Button>
                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={onClickFilterCreator("active")}
                >Active
                </Button>
                <Button
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={onClickFilterCreator("completed")}
                >Completed
                </Button>
            </div>
        </div>
    );
}
