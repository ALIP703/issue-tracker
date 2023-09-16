import React from "react";
import { Button, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import NavBar from "../../component/NavBar/NavBar";
import { ApiServices } from "../../api/api";
import { useNavigate } from "react-router-dom";
import "./AddProject.css";
function AddProject() {
  const [userData, setUserData] = React.useState({
    name: "",
    description: "",
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
    await ApiServices.createProject(userData)
      .then((res) => {
        if (res.status === 200) {
          setShowAlert(true);
          setAlertMessage("Project created successfully");
          setTimeout(() => {
            navigate("/");
          }, 1000); // Redirect after 2 seconds
        }
        setUserData({
          name: "",
          description: "",
        });
      })
      .catch((err) => {
        setShowAlert(true);
        setAlertMessage(err?.response?.data?.message ?? "Failed to create project"); // Display an error message
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
          <h1>Create Project</h1>
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={userData.name}
              onChange={(event) => {
                handleOnChange(event, userData, setUserData);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
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

export default AddProject;
