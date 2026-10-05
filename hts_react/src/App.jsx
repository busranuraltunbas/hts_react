import './App.css'
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom'

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
    return (
        <div>

            <ToastContainer />

            <Routes>

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/email-verify"
                    element={<EmailVerify />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />

            </Routes>

        </div>
    )
}

export default App;