import React from "react";
import { ApiServices } from "../../api/api";
import NavBar from "../../component/NavBar/NavBar";
import ProjectCard from "../../component/ProjectCard/ProjectCard";
import { Button } from "react-bootstrap";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [projects, setProjects] = React.useState([]);
  const [searchData, setSearchData] = React.useState("");
  const handleSearch = async (event, searchData) => {
    event.preventDefault();
    await ApiServices.projectsBySearch({ data: searchData })
      .then((res) => {
        setProjects(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const navigate = useNavigate();

  React.useEffect(() => {
    ApiServices.projects()
      .then((res) => {
        setProjects(res.data.data);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate('/login')
        }
      });
  }, [navigate]);
  return (
    <div>
      <NavBar />
      <div className="container-fluid project-cards">
        <div className="container-fluid project-cards d-flex justify-content-between align-items-center">
          <div>
            <Button
              onClick={() => {
                navigate("/add-project");
              }}
            >
              Create Project
            </Button>
          </div>
          <div>
            <form
              className="d-flex"
              onSubmit={(event) => {
                handleSearch(event, searchData);
              }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchData}
                name="search"
                onChange={(event) => {
                  setSearchData(event.target.value);
                }}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <div style={{ marginBottom: "3rem" }}>
          {projects &&
            projects.map((item, index) => (
              <ProjectCard
                key={index} // Make sure to include a unique key for each mapped component
                id={item.id}
                name={item.name}
                description={item.description}
                status={item.status}
                issueCount={item?.issueCount}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
