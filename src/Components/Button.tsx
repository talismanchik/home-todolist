import React from 'react';

type ButtonPropsType = {
    name: string
    callBack: () => void
}

export const Button: React.FC<ButtonPropsType> = ({name, callBack}) => {
    return (
        <span>
            <button onClick={callBack}>{name}</button>
        </span>
    );
};
