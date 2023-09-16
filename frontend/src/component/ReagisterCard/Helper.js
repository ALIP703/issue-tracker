import React from "react";

export const useRegisterData = () => {
    const [registerData, setRegisterData] = React.useState({
        username: "",
        password: "",
    });
    return { registerData, setRegisterData };
};
export const handleLoginDataChange = (event, registerData, setRegisterData) => {
    if (registerData) {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value,
        });
    }
};
