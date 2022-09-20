import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [todoList_ID: string]: Array<TaskType>
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
        ]
    })
    const removeTask = (taskID: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskID)})//удаляет таску
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, filter: filter}))//меняет значение фильтра
    }
    const addTask = (title: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: [{id: v1(), title, isDone: false}, ...tasks[todoListID]]})//добавляет таску
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({
            ...tasks, [todoListID]: tasks[todoListID].map(t => t.id !== taskID ? t : {...t, isDone})
        })//фильтрация выбранной таски выбрана не выбрана
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }//удаляет тудулист


    //UI:


    const todoListComponents = todoLists.map(tl => {
        let tasksForRender;
        switch (tl.filter) {
            case "completed":
                tasksForRender = tasks[tl.id].filter(task => task.isDone)
                break
            case "active":
                tasksForRender = tasks[tl.id].filter(task => !task.isDone)
                break
            default:
                tasksForRender = tasks[tl.id];
        }
        return (
            <Todolist
                todoListID={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                filter={tl.filter}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
            />
        )
    })

    return (
        <div className="App">
            {todoListComponents}
            {/*<Todolist title={"What to buy"}/>*/}
            {/*<Todolist title={"What to read"}/>*/}
        </div>
    );
}

export default App;
