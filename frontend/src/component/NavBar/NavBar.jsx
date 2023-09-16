import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import DynamicModal from "../DynamicModal/DynamicModal";

function NavBar() {
  const iconElement = <i className="bi bi-person-circle"></i>;
  const navigation = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleConfirmAction = async () => {
    // Clear the localStorage
    localStorage.clear();

    // Redirect to '/login'
    navigation("/login");
  };
  return (
    <div>
      {/* Use the DynamicModal component */}
      <DynamicModal
        showModal={showModal}
        closeModal={handleCloseModal}
        onConfirm={handleConfirmAction}
        title="Confirmation"
        message="Are you sure you want to Logout?"
        confirmText="Confirm"
      />
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            onClick={() => {
              navigation("/");
            }}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-list" /> Test task - Bug Tracking
          </a>
          <form className="d-flex">
            <a className="navbar-brand">
              {/* Logged in user */}
              <DropdownButton
                drop="start"
                variant="secondary"
                title={iconElement}
              >
                <Dropdown.Item eventKey="1" onClick={handleOpenModal}>
                  Logout
                </Dropdown.Item>
              </DropdownButton>
            </a>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
