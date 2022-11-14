type TitlePropsType = {
    title: string
}

export const Title = (props: TitlePropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <input/>
            <button>+</button>

        </div>
    )
}