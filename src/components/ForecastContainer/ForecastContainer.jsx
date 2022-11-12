import { useContext, useEffect, useState } from "react"
import CircularIndeterminate from '../loader'
import { weatherApi } from "../../api"
import DailyForecast from "../DailyForecast_/DailyForecast"
import { CurrentCityContext } from "../context"
import ErrorMessage from './../ErrorMessage/ErrorMessage'
//{ coordinates }
const ForecastContainer = () => {
    const [isPending, setPendingStatus] = useState(false)
    const [dataCity, setDataCity] = useState(null)
    const [{ searchQuery }] = useContext(CurrentCityContext)
    const [isErrorMessage, setIsErrorMessage] = useState(false)
    const [coordinates, setCoordinates] = useState(null)

    useEffect(() => {
        setPendingStatus(true)
        navigator.geolocation.getCurrentPosition(({ coords }) => setCoordinates(coords))
    }, [setCoordinates])

    useEffect(() => {
        if (!coordinates) {
            return
        }
        weatherApi.getByCoordinates(coordinates.latitude, coordinates.longitude)
            .then(({ data }) => {
                setDataCity(data)
            })
            .finally(() => {
                setPendingStatus(false)
            })
    }, [coordinates])

    useEffect(() => {
        if (!searchQuery) return

        setPendingStatus(true)
        setDataCity(null)
        weatherApi.getByCityName(searchQuery)
            .then(({ data }) => {
                setDataCity(data)
            })
            .catch(() => {
                setIsErrorMessage(true)
                setDataCity(null)
            })
            .finally(() => setPendingStatus(false))
        setIsErrorMessage(false)
    }, [searchQuery, setDataCity])

    return (
        <div>
            {isPending && <CircularIndeterminate />}

            {
                dataCity &&
                <DailyForecast dataCity={dataCity} />
            }
            {
                isErrorMessage &&
                <ErrorMessage searchQuery={searchQuery} />
            }
        </div>
    )
}

export default ForecastContainer;
