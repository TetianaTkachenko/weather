import { Route, Routes } from "react-router-dom"
import Main from "./components/Main/Main"

export default () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
        </Routes>
    )
}