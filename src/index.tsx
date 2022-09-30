import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import {cyan, lime, teal, yellow} from "@mui/material/colors";


const  theme = createTheme({
    palette: {
        primary: cyan,
        secondary: lime,
        mode:'dark'
    }
})

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/> {/*отменяет настройки по умолчанию*/}
    <App />
    </ThemeProvider>
    ,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

