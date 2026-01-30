import React, {createContext, useContext, useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes, useLocation, useNavigate, Link} from "react-router-dom";

// Create a Context for managing previous URL
const NavigationContext = createContext();

const NavigationProvider = ({children}) => {
    const [prevUrl, setPrevUrl] = useState(null);
   
    const setCurrentUrl = (url) => {
        setPrevUrl(url);
    }

    const valueObj = {
        prevUrl: prevUrl,
        setCurrentUrl: setCurrentUrl,
    }

    return (
        <NavigationContext.Provider value={valueObj}>
            {children}
        </NavigationContext.Provider>
    );
};
export const usePreviousUrl = () => useContext(NavigationContext);

export default NavigationProvider;