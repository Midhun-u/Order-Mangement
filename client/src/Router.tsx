import { Route, Routes } from "react-router"
import Sign from "./pages/Sign"
import Login from "./pages/Login"

const Router = () => {

    return (
        <Routes>
            <Route path="/sign" element={<Sign />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )

}

export default Router