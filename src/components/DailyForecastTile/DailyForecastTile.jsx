import style from './DailyForecastTile.module.css'

const DailyForecastTile = (props) => {
    return (
        <div className={style.smallCell}>
            <div
                className={props.color === 'blue'
                    ? style.smallIcons
                    : style.smallIcons_yellow}>
                {props.icon}
            </div>
            <p className={style.value}>
                {props.mainValue}
            </p>
            <p className={style.smallDescription}>
                {props.description}
            </p>
        </div>
    )
}

export default DailyForecastTile;