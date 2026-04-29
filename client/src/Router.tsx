import { Route, Routes } from "react-router"
import Sign from "./pages/Sign"

const Router = () => {

    return (
        <Routes>
            <Route path="/sign" element={<Sign />} />
        </Routes>
    )

}

export default Router