import { Route, Routes } from "react-router"
import Sign from "./pages/Sign"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import ProtectedRoutes from "./components/features/ProtectedRoutes"
import Order from "./pages/Order"

const Router = () => {

    return (
        <>
            <Routes>
                <Route path="/sign" element={
                    <Sign
                    />
                }
                />
                <Route path="/login" element={
                    <Login
                    />
                }
                />
                <Route path="/" element={
                    <ProtectedRoutes>
                        <Home
                        />
                    </ProtectedRoutes>
                }
                />
                <Route path="/cart" element={
                    < ProtectedRoutes >
                        <Cart
                        />
                    </ProtectedRoutes >
                }
                />
                <Route 
                    path="/orders"
                    element={
                        <ProtectedRoutes>
                            <Order
                            />
                        </ProtectedRoutes>
                    }
                />
            </Routes >
        </>
    )

}

export default Router