import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {serialize} from "v8";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

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
        ],
    })
    const removeTask = (taskID: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskID)})//удаляет таску
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, filter}))//меняет значение фильтра
    }
    const addTask = (title: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: [{id: v1(), title, isDone: false}, ...tasks[todoListID]]})//добавляет таску
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({
            ...tasks, [todoListID]: tasks[todoListID].map(t => t.id !== taskID ? t : {...t, isDone})
        })//фильтрация выбранной таски выбрана не выбрана
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        setTasks({
            ...tasks, [todoListID]: tasks[todoListID].map(t => t.id !== taskID ? t : {...t, title})
        })
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, title}))//меняет значение title
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }//удаляет тудулист
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID, title: title, filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }


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
            <Grid item key={tl.id}>
            <Paper elevation={2} style={{padding: "20px"}}>
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
                    changeTodoListTitle={changeTodoListTitle}
                    changeTaskTitle={changeTaskTitle}
                />
            </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between", background:"teal"}}>
                    <IconButton edge="start" color="inherit" arial-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList} errorColor={"blue"}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>
            {/*<Todolist title={"What to buy"}/>*/}
            {/*<Todolist title={"What to read"}/>*/}
        </div>
    );
}

export default App;
