import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";

function NavBar() {
  const iconElement = <i className="bi bi-person-circle"></i>;
  const navigation=useNavigate()
  const handleLogout = () => {
    // Clear the localStorage
    localStorage.clear();
    
    // Redirect to '/login'
    navigation('/login');
  };
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">
            <i className="bi bi-list" /> Test task - Bug Tracking
          </a>
          <form className="d-flex" >
            <a className="navbar-brand">
              {/* Logged in user */}
              <DropdownButton
                drop="start"
                variant="secondary"
                title={iconElement}
              >
                <Dropdown.Item eventKey="1" onClick={handleLogout}>Logout</Dropdown.Item>
              </DropdownButton>
            </a>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
