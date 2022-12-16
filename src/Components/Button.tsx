import React from 'react';

type ButtonPropsType = {
    name: string
    callBack: () => void
    className?: string
}

export const Button: React.FC<ButtonPropsType> = ({className, name, callBack}) => {
    return (
        <span>
            <button className={className} onClick={callBack}>{name}</button>
        </span>
    );
};
