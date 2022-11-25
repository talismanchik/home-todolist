import React, {useState} from 'react';
import {Input} from "../Input";
import {Button} from "../Button";

type TitlePropsType = {
    title: string
    addedList: (val: string) => void
}

export const Title: React.FC<TitlePropsType> = ({title, addedList}) => {
    let [inputText, setInputText] = useState('')

    const callBackButtonForInput = () => {
        addedList(inputText)
        setInputText('')
    }

    return (
        <div>
            <div>
                <h2>{title}</h2>
            </div>
            <div>
                <Input
                    inputText={inputText}
                    setInputText={setInputText}/>
                <Button
                    name={'+'}
                    callBack={callBackButtonForInput}/>
            </div>
        </div>
    );
};
