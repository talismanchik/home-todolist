import React, {ChangeEvent, useState} from 'react';
import s from './../../App.module.css';
import {Button} from "../Button";

type TitlePropsType = {
    addedItem: ( val: string) => void
}

export const AddItem: React.FC<TitlePropsType> = ({addedItem}) => {
    let [inputText, setInputText] = useState('')
    let [error, setError] = useState('')

    const onchangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.currentTarget.value)
        setError('')
    }
    const callBackButtonForInput = () => {
        if (inputText.trim() !== '') {
            addedItem( inputText.trim())
        } else {
            setError("Введите текст")
        }
        setInputText('')
    }

    return (
        <div>
            <div>
                <input
                    value={inputText}
                    onChange={onchangeInputHandler}
                    className={error ? s.error : ''}
                />

                <Button
                    name={'+'}
                    callBack={callBackButtonForInput}/>
            </div>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};
