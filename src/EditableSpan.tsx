import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    classes?: string
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === " Enter" && offEditMode()
    }
    return (
        editMode
            ? <TextField
                variant={"standard"}
                color={"primary"}
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownOffEditMode}
            />
            // <input
            //     value={title}
            //     autoFocus
            //     onBlur={offEditMode}
            //     onChange={onChangeSetTitle}
            //     onKeyDown={onKeyDownOffEditMode}
            // />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;