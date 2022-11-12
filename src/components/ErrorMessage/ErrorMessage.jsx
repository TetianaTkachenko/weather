import style from './ErrorMessage.module.css'

const ErrorMessage = (props) => {
    return (
        <div className={style.wrapper}>
            <p className={style.content}>
                Sorry! But we didn't find &nbsp;
                <span>{props.searchQuery}!</span>
                <br />
                Could you try again?
            </p>
        </div>
    )
}
export default ErrorMessage;