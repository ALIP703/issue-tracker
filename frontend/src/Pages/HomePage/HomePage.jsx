import React from "react";
import { ApiServices } from "../../api/api";
import NavBar from "../../component/NavBar/NavBar";
import ProjectCard from "../../component/ProjectCard/ProjectCard";
import { Button } from "react-bootstrap";
import "./HomePage.css";

function HomePage() {
  const [projects, setProjects] = React.useState([]);
  const [searchData, setSearchData] = React.useState("");
  const handleSearch = async (event, searchData) => {
    event.preventDefault();
    console.log(searchData);
    await ApiServices.projectsBySearch({ data: searchData })
      .then((res) => {
        console.log(res);
        setProjects(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  React.useEffect(() => {
    ApiServices.projects()
      .then((res) => {
        console.log(res.data.data);
        setProjects(res.data.data);
      })
      .catch();
  }, []);
  return (
    <div>
      <NavBar />
      <div className="container-fluid project-cards">
        <div className="container-fluid project-cards d-flex justify-content-between align-items-center">
          <div>
            <Button>Create Project</Button>
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
        {projects &&
          projects.map((item, index) => (
            <ProjectCard
              key={index} // Make sure to include a unique key for each mapped component
              name={item.name}
              description={item.description}
              status={item.status}
              issueCount={item?.issueCount}
            />
          ))}
      </div>
    </div>
  );
}

export default HomePage;
