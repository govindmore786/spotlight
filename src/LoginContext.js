import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context for the Login state
const LoginContext = createContext();

// Provider component to wrap around your app
export const LoginProvider = ({ children }) => {
    
    const [isSignUp, setIsSignUp] = useState(false);
    const [isnav, setIsnav] = useState(false);
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
    });

    

    return (
        <LoginContext.Provider
            value={{
                isSignUp,
                setIsSignUp,
                isRightPanelActive,
                setIsRightPanelActive,
                formData,
                setFormData,
                isnav,
                setIsnav,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};

// Custom hook to use the Login context
export const useLogin = () => useContext(LoginContext);