import { Card, Button, Alert } from "react-bootstrap";
import "./LoginCard.css";
import { handleLoginDataChange, useLoginData } from "./Helper";
import { useNavigate } from "react-router-dom";
import { ApiServices } from "../../api/api";
import React from "react";

function LoginCard() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = React.useState(false); // State to control the alert visibility
  const [alertMessage, setAlertMessage] = React.useState(""); // State to store the alert message

  const handleSignIn = async (event, loginData, setLoginData) => {
    event.preventDefault();
    await ApiServices.login(loginData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setLoginData({
          username: "",
          password: "",
        });
        setShowAlert(true);
        setAlertMessage("User Login successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000); // Redirect after 1 seconds
      })
      .catch((err) => {
        setShowAlert(true);
        setAlertMessage(err?.response?.data?.message ?? "Failed to Login"); // Display an error message
      });
  };

  const { loginData, setLoginData } = useLoginData();
  return (
    <div className="login-container">
      <Card className="card">
        <h3>Sign-in</h3>
        <form
          onSubmit={(event) => handleSignIn(event, loginData, setLoginData)}
        >
          <input
            className="form-control"
            placeholder="Username"
            name="username"
            required
            value={loginData.username}
            onChange={(event) => {
              handleLoginDataChange(event, loginData, setLoginData);
            }}
          />
          <input
            className="form-control"
            type="password"
            required
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={(event) => {
              handleLoginDataChange(event, loginData, setLoginData);
            }}
          />
          <Button className="btn" type="submit">
            SignIn
          </Button>
        </form>
        {showAlert && (
          <div>
            <Alert
              variant={
                alertMessage.includes("successfully") ? "success" : "danger"
              }
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          </div>
        )}
      </Card>
    </div>
  );
}

export default LoginCard;
