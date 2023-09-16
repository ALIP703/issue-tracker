import React from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { handleLoginDataChange, useRegisterData } from "./Helper";
import { useNavigate } from "react-router-dom";
import { ApiServices } from "../../api/api";
import "./RegisterCard.css";

function RegisterCard() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = React.useState(false); // State to control the alert visibility
  const [alertMessage, setAlertMessage] = React.useState(""); // State to store the alert message

  const handleSignUp = async (event, registerData, setRegisterData) => {
    event.preventDefault();
    await ApiServices.register(registerData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setRegisterData({
          username: "",
          password: "",
        });
        setShowAlert(true);
        setAlertMessage("Admin created successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000); // Redirect after 2 seconds
      })
      .catch((err) => {
        setShowAlert(true);
        setAlertMessage(
          err?.response?.data?.message ?? "Failed to Registration"
        ); // Display an error message
      });
  };

  const { registerData, setRegisterData } = useRegisterData();
  React.useEffect(() => {
    ApiServices.registrationCheck().then((res) => {
      if (res.data.data == true) {
        navigate("/login");
      }
    });
  }, [navigate]);
  return (
    <div className="login-container">
      <Card className="card">
        <h3>Sign-up</h3>
        <form
          onSubmit={(event) =>
            handleSignUp(event, registerData, setRegisterData)
          }
        >
          <input
            className="form-control"
            placeholder="Username"
            name="username"
            value={registerData.username}
            onChange={(event) => {
              handleLoginDataChange(event, registerData, setRegisterData);
            }}
          />
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={registerData.password}
            onChange={(event) => {
              handleLoginDataChange(event, registerData, setRegisterData);
            }}
          />
          <Button className="btn" type="submit">
            SignUp
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

export default RegisterCard;
