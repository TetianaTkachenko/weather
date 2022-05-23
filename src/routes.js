import { Route, Routes } from "react-router-dom"
import WeeklyForecast from "./pages/weeklyForecast"
import DailyForecast from "./pages/dailyForecast"
import Main from "./pages/main/main"

export default () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/api/location/' element={<WeeklyForecast />}>
                <Route path=':woeid' element={<WeeklyForecast />} />
            </Route>
            <Route path='/api/location/' element={<DailyForecast />}>
                <Route path=':woeid/:date' element={<DailyForecast />} />
            </Route>
        </Routes>
    )
}