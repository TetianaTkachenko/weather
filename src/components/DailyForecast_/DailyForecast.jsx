import AirIcon from '@mui/icons-material/Air';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import SpeedIcon from '@mui/icons-material/Speed';
import classNames from 'classnames';
import style from './DailyForecast.module.css'
import DailyForecastTile from '../DailyForecastTile/DailyForecastTile';

const DailyForecast = ({ dataCity }) => {

    let date = new Date(dataCity.dt * 1000)
    const currentDate = date.toLocaleString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
    const getNumericTime = (unix) => {
        const timestamp = new Date(unix * 1000)
        return timestamp.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric'
        })
    }

    const averageTemperature = Math.round((dataCity.main.temp_min + dataCity.main.temp_min) / 2)
    const [currentWeather] = dataCity.weather

    const tiles = [
        {
            id: 1,
            mainValue: dataCity.main.pressure.toFixed(0),
            description: 'Pressure',
            icon: <SpeedIcon />,
            color: 'blue'
        },
        {
            id: 2,
            description: 'Wind',
            mainValue: dataCity.wind.speed.toFixed(1),
            icon: <AirIcon />,
            color: 'blue'
        },
        {
            id: 3,
            mainValue: getNumericTime(dataCity.sys.sunrise),
            description: 'Sunrise',
            icon: <WbTwilightIcon />,
            color: 'yellow'
        },
        {
            id: 4,
            mainValue: dataCity.main.humidity.toFixed(0),
            description: 'Humidity',
            icon: <InvertColorsIcon />,
            color: 'blue'
        },
        {
            id: 5,
            mainValue: dataCity.visibility.toFixed(0),
            description: 'Visibility',
            icon: <VisibilityOffIcon />,
            color: 'blue'
        },
        {
            id: 6,
            mainValue: getNumericTime(dataCity.sys.sunset),
            description: 'Sunset',
            icon: <WbTwilightIcon />,
            color: 'yellow'
        },
    ]

    return (
        <div className={style.container}>
            <div
                className={classNames(style.wrapper, style[`weather_${currentWeather.icon}`])}
            >
                <div className={style.headerCard}>
                    <p>{currentDate}</p>
                    <p>{dataCity.name}</p>
                </div>
                <div className={style.mediumPartCard}>
                    <div className={style.mediumPartCard__mainData}>
                        <div
                            className={style.averageTemperature}>
                            {averageTemperature}
                            <p className={style.symbol}>
                                &#8451;
                            </p>
                        </div>
                        <p className={style.smallDescription}>
                            {currentWeather.description}
                        </p>
                    </div>
                    <img
                        className={style.largeIcon}
                        src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
                        alt='img'
                    />
                </div>
                <div className={style.dataContent}>
                    {tiles.map(tile =>
                        <DailyForecastTile
                            key={tile.id}
                            mainValue={tile.mainValue}
                            description={tile.description}
                            icon={tile.icon}
                            color={tile.color} />)}
                </div>
            </div>
        </div>
    )
}
export default DailyForecast;
