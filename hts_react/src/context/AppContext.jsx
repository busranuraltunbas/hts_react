import { createContext, useEffect, useState } from "react";
import { AppConstants } from "../util/constant.js";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const backendURL = AppConstants.BACKEND_URL;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);


    // Kullanıcının authentication durumunu kontrol eder
    useEffect(() => {
        const checkAuthentication = async () => {

            try {
                const response = await axios.get(
                    `${backendURL}/is-authenticated`,
                    { withCredentials: true }
                );

                if (response.status === 200 && response.data === true) {

                    setIsLoggedIn(true);

                    const profileResponse = await axios.get(
                        `${backendURL}/profile`,
                        { withCredentials: true }
                    );

                    if (profileResponse.status === 200) {
                        setUserData(profileResponse.data);
                    }

                } else {
                    setIsLoggedIn(false);
                    setUserData(null);
                }

            } catch (error) {

                setIsLoggedIn(false);
                setUserData(null);

                if (error.response?.status !== 401) {
                    console.log("Authentication check failed:", error);
                }

            } finally {
                setIsAuthLoading(false);
            }
        };

        checkAuthentication();

    }, [backendURL]);


    // Kullanıcı profil bilgilerini getirir
    const getUserData = async () => {

        try {

            const response = await axios.get(
                `${backendURL}/profile`,
                {
                    withCredentials: true
                }
            );

            if (response.status === 200) {

                setUserData(response.data);
                setIsLoggedIn(true);

                return response.data;

            }

        } catch (error) {

            setIsLoggedIn(false);
            setUserData(null);

            if (error.response?.status !== 401) {
                toast.error(
                    error.response?.data?.message ||
                    "Profil alınamadı."
                );
            }

            return null;
        }
    };

    const logout = async () => {
        try {
            await axios.post(
                `${backendURL}/logout`,
                {},
                { withCredentials: true }
            );

            setIsLoggedIn(false);
            setUserData(null);

            toast.success("Başarıyla çıkış yapıldı.");

        } catch (error) {
            console.log("Logout error:", error);

            setIsLoggedIn(false);
            setUserData(null);

            toast.error("Çıkış yapılırken bir hata oluştu.");
        }
    };


    const contextValue = {
        backendURL,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        isAuthLoading,
        logout,
};


    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};