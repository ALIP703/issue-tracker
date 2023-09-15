import { Card, Button } from "react-bootstrap";
import "./LoginCard.css";
import { handleLoginDataChange, useLoginData } from "./Helper";

function LoginCard() {
  const { loginData, setLoginData } = useLoginData();
  return (
    <div className="login-container">
      <Card className="card">
        <h3>Sign-up</h3>
        <form
          onSubmit={(event) => {
              handleSignUp(
                event,
                file,
                userData,
                setModelShow,
                setTableData,
                setImagePreviewUrl,
                setUserData
              );
            
          }}
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
