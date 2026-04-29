import { Route, Routes } from "react-router"
import Sign from "./pages/Sign"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Cart from "./pages/Cart"

const Router = () => {

    return (
        <>
            <Routes>
                <Route path="/sign" element={<Sign />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </>
    )

}

export default Router