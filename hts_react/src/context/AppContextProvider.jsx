import { useState } from "react";
import { AppConstants } from "../util/constant.js";
import { AppContext } from "./AppContext";


export const AppContextProvider = (props) => {

    const backendUrl = AppConstants.BACKEND_URL;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);

    const contextValue = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};