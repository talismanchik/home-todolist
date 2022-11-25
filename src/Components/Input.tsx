import React, {ChangeEvent} from 'react';

type InputPropsType = {
    inputText: string
    setInputText: (value: string) => void
}

export const Input: React.FC<InputPropsType> = ({inputText, setInputText}) => {

    const onchangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.currentTarget.value)
    }

    return (
        <input value={inputText} onChange={onchangeInputHandler}/>
    );
};

