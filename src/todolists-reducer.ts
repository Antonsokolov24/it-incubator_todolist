import {FilterValuesType, TodoListType} from "./App";
import {v1} from "uuid";


type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
}

type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}

type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export type ActionType = RemoveTodolistAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodolistFilterAT

const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListID = v1()
            const newTodoList: TodoListType = {
                id: newTodoListID, title: action.title, filter: "all"
            }
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id !== action.id ? tl : {...tl, title: action.title})
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id !== action.id ? tl : {...tl, filter: action.filter})
        default:
            return todoLists
    }
}

export default todoListsReducer;

export const RemoveTodoListAC = (id: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", id})
export const AddTodoListAC = (title: string): AddTodoListAT => ({type: "ADD-TODOLIST", title})
export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    title,
    id
})
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterAT =>
    ({type: "CHANGE-TODOLIST-FILTER", filter, id})