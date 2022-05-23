import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { weatherApi } from '../../api'
import OneLineChurts from '../../components/charts/oneLineCharts'
import { CurrentCityContext } from '../../components/context'
import style from './dailyForecast.module.css'

const DailyForecast = () => {
    const [{ currentDate }] = useContext(CurrentCityContext)
    const [{ woeid }] = useContext(CurrentCityContext)
    const [data, getData] = useState(null)
    const dateForApi = currentDate.applicable_date.split('-').join('/')
    const date = new Date(currentDate.applicable_date)
    const dateToString = date.toLocaleString('en', {
        month: 'long',
        day: "numeric",
    })
    useEffect(() => {
        weatherApi.getForecastOneDay(woeid, dateForApi)
            .then(res => {
                getData(res.data)
                console.log('data', res.data)
            })
    }, [woeid, dateForApi])

    return (
        <div className={style.wraper}>
            <div className={style.flexBox}>
                <div className={style.flexCol}>
                    <div className={style.containerForDate}>
                        <h2>{dateToString}</h2>
                        <img
                            className={style.mdImage}
                            src={`https://www.metaweather.com/static/img/weather/${currentDate.weather_state_abbr}.svg`}
                            alt=''
                        />
                    </div>
                </div>
                <div className={style.flexColForData}>
                    <div className={style.flexRow}>
                        <div className={style.flexBox}>
                            <p>min. t&#176;</p>
                            <p className={style.fontBoldBlue}>{currentDate.min_temp.toFixed(0)}&#176;</p>
                        </div>
                        <div className={style.flexBox}>
                            <p>max. t&#176;</p>
                            <p className={style.fontBoldRed}>{currentDate.max_temp.toFixed(0)}&#176;</p>
                        </div>
                    </div>
                    <div className={style.flexBox}>
                        <p>Wind</p>
                        <div className={style.flexBox}>
                            <p style={{ transform: `rotate(${currentDate.wind_direction}deg) ` }}>&#8595;</p>
                            <p style={{ marginLeft: '10px' }}>{currentDate.wind_speed.toFixed(0)} mph</p>
                        </div>
                    </div>
                    <hr />
                    <div className={style.flexBox}>
                        <p>Humidity</p>
                        <p>{currentDate.humidity}%</p>
                    </div>
                    <hr />
                    <div className={style.flexBox}>
                        <p>Visibility</p>
                        <p>{currentDate.visibility.toFixed(0)} miles</p>
                    </div>
                    <hr />
                    <div className={style.flexBox}>
                        <p>Predictability</p>
                        <p>{currentDate.predictability}%</p>
                    </div>
                    {data && (
                        <OneLineChurts dataForChurts={data} />
                    )}
                </div>
            </div>
        </div>
    )
}
export default DailyForecast;