import React, {ChangeEvent} from 'react';

type InputPropsType = {
    inputText: string
    setInputText: (value: string) => void
}

export const Input = (props: InputPropsType) => {

    const onchangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setInputText(event.currentTarget.value)
    }

    return (
        <input value={props.inputText} onChange={onchangeInputHandler}/>
    );
};

