import { Alert, Button, Form } from "react-bootstrap";
import NavBar from "../../component/NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiServices } from "../../api/api";
import React from "react";

function AddIssue() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get("projectId");
  const [userData, setUserData] = React.useState({
    tracker: "",
    description: "",
    projectId,
  });
  const [showAlert, setShowAlert] = React.useState(false); // State to control the alert visibility
  const [alertMessage, setAlertMessage] = React.useState(""); // State to store the alert message

  const navigate = useNavigate();
  const handleOnChange = (event, userData, setUserData) => {
    if (userData) {
      setUserData({
        ...userData,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handelOnSubmit = async (event, userData, setUserData) => {
    event.preventDefault();
    await ApiServices.createIssue(userData)
      .then((res) => {
        if (res.status === 200) {
          setShowAlert(true);
          setAlertMessage("Issue created successfully");
          setTimeout(() => {
            navigate(`/project?id=${projectId}`);
          }, 1000); // Redirect after 2 seconds
        }
        setUserData({
          tracker: "",
          description: "",
        });
      })
      .catch((err) => {
        setShowAlert(true);
        setAlertMessage(
          err?.response?.data?.message ?? "Failed to create Issue"
        ); // Display an error message
      });
  };
  return (
    <div>
      <NavBar />
      <div className="container-fluid create-project">
        <Form
          className="container-fluid"
          onSubmit={(event) => {
            handelOnSubmit(event, userData, setUserData);
          }}
        >
          <h1>Create Issue</h1>
          {showAlert && (
            <Alert
              variant={
                alertMessage.includes("successfully") ? "success" : "danger"
              }
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}
          <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
            <Form.Label>Tracker</Form.Label>
            <Form.Select
              name="tracker"
              value={userData.tracker}
              onChange={(event) => {
                handleOnChange(event, userData, setUserData);
              }}
              required
            >
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              required
              value={userData.description}
              onChange={(event) => {
                handleOnChange(event, userData, setUserData);
              }}
            />
          </Form.Group>
          <Button type="submit">Create Project</Button>
        </Form>
      </div>
    </div>
  );
}

export default AddIssue;
