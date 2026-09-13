import { createContext, useEffect, useState } from "react";
import { AppConstants } from "../util/constant.js";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendURL = AppConstants.BACKEND_URL;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {

        const checkAuthentication = async () => {

            try {
                const response = await axios.get(
                    `${backendURL}/is-authenticated`,
                    {
                        withCredentials: true
                    }
                );

                if (response.status === 200 && response.data === true) {

                    setIsLoggedIn(true);

                    const profileResponse = await axios.get(
                        `${backendURL}/profile`,
                        {
                            withCredentials: true
                        }
                    );

                    if (profileResponse.status === 200) {
                        setUserData(profileResponse.data);
                    }

                } else {
                    setIsLoggedIn(false);
                    setUserData(null);
                }

            } catch (error) {

                if (error.response?.status === 401) {
                    setIsLoggedIn(false);
                    setUserData(null);
                    return;
                }

                if (error.response) {
                    const msg =
                        error.response.data?.message ||
                        "Authentication check failed";

                    toast.error(msg);
                } else {
                    toast.error(error.message);
                }

                setIsLoggedIn(false);
                setUserData(null);
            }
        };

        checkAuthentication();

    }, [backendURL]);


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
            } else {
                toast.error("Profil alınamadı.");
            }

        } catch (error) {
            toast.error(error.message);
        }
    };


    const contextValue = {
        backendURL,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};