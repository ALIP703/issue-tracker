import { Card, Button } from "react-bootstrap";
import "./LoginCard.css";
import { handleLoginDataChange, useLoginData } from "./Helper";
import { useNavigate } from "react-router-dom";
import { ApiServices } from "../../api/api";

function LoginCard() {
  const navigate = useNavigate();
  const handleSignUp = async (event, loginData, setLoginData) => {
    event.preventDefault();
    await ApiServices.login(loginData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        setLoginData({
          username: "",
          password: "",
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const { loginData, setLoginData } = useLoginData();
  return (
    <div className="login-container">
      <Card className="card">
        <h3>Sign-up</h3>
        <form
          onSubmit={(event) => handleSignUp(event, loginData, setLoginData)}
        >
          <input
            className="form-control"
            placeholder="Username"
            name="username"
            value={loginData.username}
            onChange={(event) => {
              handleLoginDataChange(event, loginData, setLoginData);
            }}
          />
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={(event) => {
              handleLoginDataChange(event, loginData, setLoginData);
            }}
          />
          <Button className="btn" type="submit">
            SignUp
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default LoginCard;
