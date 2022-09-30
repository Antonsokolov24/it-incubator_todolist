import {Button, IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddCircleOutlineTwoTone, AddCommentTwoTone, TextIncreaseTwoTone} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    errorColor: string
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false) // снимает состояние ошибки с инпут
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItem()
    const onClickAddItem = () => { //добавляет только если есть текст, исключает добавление пробелов
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const inputErrorStyles = error ?
        {
            border: `2px solid  ${props.errorColor}`,
            outline: "none"
        }
        : {};
    const errorMessage = <div style={{color: props.errorColor}}>Title is required!</div>
    return (
        <div>
            <TextField
                size={"small"}
                variant={"outlined"}
                value={title} //очищает после ввода ссылаясь на title
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddItem}
                label={"Title"}
                error={error}
                // helperText={error && "Title is required!"}
            />
            {/*<input*/}
            {/*    style={inputErrorStyles}*/}
            {/*    value={title} //очищает после ввода ссылаясь на title*/}
            {/*    onChange={onChangeSetTitle}*/}
            {/*    onKeyDown={onKeyDownAddItem}*/}
            {/*/>*/}
            <IconButton onClick={onClickAddItem}>
                <AddCircleOutlineTwoTone/>
            </IconButton>
            {/*<button onClick={onClickAddItem}>+</button>*/}
            {/*<Button variant="contained" onClick={onClickAddItem}>+</Button>*/}
            {error && errorMessage}
        </div>
    );
};

export default AddItemForm;