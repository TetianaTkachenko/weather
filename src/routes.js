import { Route, Routes } from "react-router-dom"
import City from "./pages/city"
import Main from "./pages/main/autoComplete"

export default () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/api/location/' element={<City />}>
                <Route path=':woeid' element={<City />} />
            </Route>
        </Routes>
    )
}