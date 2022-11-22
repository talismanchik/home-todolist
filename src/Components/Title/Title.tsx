import React, {useState} from 'react';
import {Input} from "../Input";
import {Button} from "../Button";

type TitlePropsType = {
    title: string
    callBack: () => void
    inputText: string
    setInputText: (value: string) => void
}

export const Title = (props: TitlePropsType) => {

    return (
        <div>
            <div>
                <h2>{props.title}</h2>
            </div>
            <div>
                <Input
                    inputText={props.inputText}
                    setInputText={props.setInputText}/>
                <Button
                    name={'+'}
                    callBack={props.callBack}/>
            </div>
        </div>
    );
};
