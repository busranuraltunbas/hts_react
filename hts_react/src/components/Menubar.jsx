import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Menubar = () => {

    const navigate = useNavigate();

    const {
        userData,
        backendURL,
        setUserData,
        setIsLoggedIn
    } = useContext(AppContext);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const isAdmin = userData?.role === "ADMIN";

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    const handleLogout = async () => {

        try {

            const response = await axios.post(
                backendURL + "/logout",
                {},
                { withCredentials: true }
            );

            if (response.status === 200) {

                setIsLoggedIn(false);
                setUserData(null);

                navigate("/login");
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Çıkış yapılırken bir hata oluştu."
            );
        }
    };

    const sendVerificationOtp = async () => {

        try {

            const response = await axios.post(
                backendURL + "/send-otp",
                {},
                { withCredentials: true }
            );

            if (response.status === 200) {

                navigate("/email-verify");

                toast.success(
                    "Doğrulama kodu e-posta adresinize gönderildi."
                );
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "OTP gönderilemedi."
            );
        }
    };

    return (
        <nav className="navbar bg-white px-5 py-4 d-flex justify-content-between align-items-center">

            {/* LOGO */}
            <div
                className="d-flex align-items-center gap-2"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
            >
                <img
                    src={assets.hero}
                    alt="hero"
                    width={32}
                    height={32}
                />

                <span className="fw-bold fs-4 text-dark">
                    HTS
                </span>
            </div>


            {/* MENU */}
            {userData && (
                <div className="d-flex align-items-center gap-3">

                    {/* HAYVANLAR */}
                    <button
                        className="btn btn-light"
                        onClick={() => navigate("/animals")}
                    >
                        Hayvanlar
                    </button>

                    {/* MÜŞTERİLER */}
                    <button
                        className="btn btn-light"
                        onClick={() => navigate("/customers")}
                    >
                        Müşteriler
                    </button>

                    {/* ADMIN */}
                    {isAdmin && (
                        <button
                            className="btn btn-dark"
                            onClick={() => navigate("/admin")}
                        >
                            Admin Paneli
                        </button>
                    )}

                    {/* USER DROPDOWN */}
                    <div
                        className="position-relative"
                        ref={dropdownRef}
                    >

                        <div
                            className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center"
                            style={{
                                width: "40px",
                                height: "40px",
                                cursor: "pointer",
                                userSelect: "none"
                            }}
                            onClick={() =>
                                setDropdownOpen((prev) => !prev)
                            }
                        >
                            {userData?.name?.[0]?.toUpperCase()}
                        </div>


                        {dropdownOpen && (
                            <div
                                className="position-absolute shadow bg-white rounded p-2"
                                style={{
                                    top: "50px",
                                    right: 0,
                                    zIndex: 100,
                                    minWidth: "180px"
                                }}
                            >

                                {/* USER BILGISI */}
                                <div className="px-2 py-1 text-muted small">
                                    {userData?.email}
                                </div>

                                <div className="dropdown-divider"></div>


                                {/* ADMIN ROLE */}
                                {isAdmin && (
                                    <div
                                        className="dropdown-item py-2 px-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            navigate("/admin");
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        <i className="bi bi-shield-lock me-2"></i>
                                        Admin Paneli
                                    </div>
                                )}


                                {/* EMAIL VERIFICATION */}
                                {!userData?.isAccountVerified && (
                                    <div
                                        className="dropdown-item py-2 px-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={sendVerificationOtp}
                                    >
                                        <i className="bi bi-envelope-check me-2"></i>
                                        E-postayı doğrula
                                    </div>
                                )}


                                {/* LOGOUT */}
                                <div
                                    className="dropdown-item py-2 px-2 text-danger"
                                    style={{ cursor: "pointer" }}
                                    onClick={handleLogout}
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    Çıkış yap
                                </div>

                            </div>
                        )}

                    </div>

                </div>
            )}

            {/* LOGIN */}
            {!userData && (
                <div
                    className="btn btn-outline-dark rounded-pill px-3"
                    onClick={() => navigate("/login")}
                    style={{ cursor: "pointer" }}
                >
                    Giriş yap
                    <i className="bi bi-arrow-right ms-2"></i>
                </div>
            )}

        </nav>
    );
};

export default Menubar;
