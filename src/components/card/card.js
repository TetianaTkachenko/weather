import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentCityContext } from '../context'
import style from './card.module.css'

const Card = (card) => {
    const [{ woeid }, dispatch] = useContext(CurrentCityContext)
    const [selectedDate, getSelectedDate] = useState(null)
    const navigate = useNavigate()

    let date = new Date(card.applicable_date)
    const currentWeekday = date.toLocaleString('en', {
        weekday: "long"
    })
    const currentDate = date.toLocaleString('en', {
        month: 'long',
        day: "numeric",
    })

    useEffect(() => {
        if (!selectedDate) {
            return
        }
        dispatch({ type: 'SET_CURRENT_DATE', payload: selectedDate })
        navigate(`/api/location/${woeid}/${selectedDate.applicable_date}`)
    }, [selectedDate, dispatch, woeid, navigate])

    const handleClick = () => {
        getSelectedDate(card)
    }

    return (
        <div className={style.container}>
            <div
                onClick={handleClick}
                className={style.box}>
                <h3>{currentWeekday}</h3>
                <h3 className={style.currentDate}>{currentDate}</h3>
                <img className={style.icon} src={`https://www.metaweather.com/static/img/weather/${card.weather_state_abbr}.svg`} alt=''></img>
                <p>{card.weather_state_name}</p>
                <div className={style.rowBox}>
                    <div className={style.colBox}>
                        <p className={style.paramName}>max.</p>
                        <p className={style.paramValue}>{card.max_temp.toFixed(0)}&#176;</p>
                    </div>
                    <div className={style.colBox}>
                        <p className={style.paramName}>min.</p>
                        <p className={style.paramValue}>{card.min_temp.toFixed(0)}&#176;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card;
