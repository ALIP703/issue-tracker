import React from "react";

export const useLoginData = () => {
    const [loginData, setLoginData] = React.useState({
        username: "",
        password: "",
    });
    return { loginData, setLoginData };
};
export const handleLoginDataChange = (event, loginData, setLoginData) => {
    if (loginData) {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value,
        });
    }
};
