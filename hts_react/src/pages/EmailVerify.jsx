import { assets } from "../assets/assets.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerify = () => {

    const inputRef = useRef([]);
    const [loading, setLoading] = useState(false);

    const { backendURL } = useContext(AppContext);

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const handleChange = (e, index) => {

        const value = e.target.value.replace(/\D/g, "");

        e.target.value = value;

        if (value && index < 5) {
            inputRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {

        if (
            e.key === "Backspace" &&
            !e.target.value &&
            index > 0
        ) {
            inputRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {

        e.preventDefault();

        const paste = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6)
            .split("");

        paste.forEach((digit, i) => {

            if (inputRef.current[i]) {
                inputRef.current[i].value = digit;
            }

        });

        const nextIndex = paste.length < 6 ? paste.length : 5;

        inputRef.current[nextIndex]?.focus();
    };

    const handleVerify = async () => {

        if (!email) {
            toast.error("E-posta adresi bulunamadı.");
            navigate("/login");
            return;
        }

        const otp = inputRef.current
            .map(input => input?.value || "")
            .join("");

        if (otp.length !== 6) {
            toast.error("Lütfen 6 haneli doğrulama kodunu giriniz.");
            return;
        }

        setLoading(true);

        try {

            const response = await axios.post(
                `${backendURL}/verify-otp`,
                {
                    email,
                    otp
                }
            );

            if (response.status === 200) {

                toast.success(
                    "E-posta adresiniz başarıyla doğrulandı."
                );

                navigate("/login");

            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Doğrulama başarısız oldu."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div
            className="email-verify-container d-flex align-items-center justify-content-center vh-100 position-relative"
            style={{
                background: "linear-gradient(90deg, #6a5af9, #8268f9)"
            }}
        >

            <Link
                to="/"
                className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2 text-decoration-none"
            >

                <img
                    src={assets.hero}
                    alt="HTS"
                    height={32}
                    width={32}
                />

                <span className="fs-4 fw-semibold text-light">
                    HTS
                </span>

            </Link>

            <div
                className="p-5 rounded-4 shadow bg-white"
                style={{ width: "400px" }}
            >

                <h4 className="text-center fw-bold mb-2">
                    E-posta Doğrulama
                </h4>

                <p className="text-center mb-4">
                    E-posta adresinize gönderilen 6 haneli kodu giriniz.
                </p>

                <div className="d-flex justify-content-between gap-2 mb-4">

                    {[...Array(6)].map((_, i) => (

                        <input
                            key={i}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            className="form-control text-center fs-4 otp-input"
                            ref={(el) => {
                                inputRef.current[i] = el;
                            }}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onPaste={handlePaste}
                        />

                    ))}

                </div>

                <button
                    type="button"
                    className="btn btn-primary w-100 fw-semibold"
                    disabled={loading}
                    onClick={handleVerify}
                >
                    {loading ? "Doğrulanıyor..." : "E-postayı Doğrula"}
                </button>

            </div>

        </div>
    );
};

export default EmailVerify;