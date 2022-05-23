import { useContext, useEffect, useState } from "react";
import { weatherApi } from "../../api";
import Card from "../../components/card/card";
import DoughnutChurts from "../../components/charts/Doughnut";
import { CurrentCityContext } from "../../components/context";
import style from './weekly.module.css'
import CircularIndeterminate from "../../components/loader";

const WeeklyForecast = () => {
    const [dataCity, setDataCity] = useState(null)
    const [{ woeid }] = useContext(CurrentCityContext)

    useEffect(() => {
        weatherApi.getLocationById(woeid)
            .then(res => {
                setDataCity(res.data)
            })
    }, [woeid])

    return (
        <div>
            {!dataCity
                ? <CircularIndeterminate />
                : (
                    <div>
                        <div className={style.locationBox}>
                            <h2 className={style.cityTitle}>{dataCity.title}</h2>
                            <p className={style.locationCountry}>{dataCity.parent.title}</p>
                        </div>
                        <div className={style.wraper}>
                            <div className={style.chartsBox}>
                                <DoughnutChurts dataForChurts={dataCity.consolidated_weather} />
                            </div>
                            <div className={style.cardBox}>
                                <div className={style.flexBox}>
                                    {dataCity.consolidated_weather.map(card => <Card {...card} key={card.id} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}
export default WeeklyForecast;