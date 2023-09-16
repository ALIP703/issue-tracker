import React from "react";
import NavBar from "../../component/NavBar/NavBar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useLocation } from "react-router-dom";
import { ApiServices } from "../../api/api";
import Card from "react-bootstrap/Card";
import "./ViewProject.css";
import IssueCard from "../../component/IssueCard/IssueCard";

function ViewProject() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get("id");
  const [projectData, setProjectData] = React.useState({
    id: 0,
    name: "",
    description: "",
    status: "",
    issues: [
      {
        id: 0,
        tracker: "",
        description: "",
        createdAt: "",
        status: "",
      },
    ],
  });
  React.useEffect(() => {
    ApiServices.project(projectId).then((res) => {
      setProjectData(res.data.data);
    });
  }, [projectId]);
  console.log(projectData);
  return (
    <div className="view-project">
      <NavBar />
      <div className="container mt-5 mb-5">
        <Card>
          <div className="d-flex justify-content-between align-items-center">
            <h1>{projectData.name}</h1>
            <div>
              <Button variant="danger" style={{ marginRight: "1rem" }}>
                Close Project
              </Button>
              <Button variant="secondary" style={{ marginRight: "1rem" }}>
                Create Issue
              </Button>
            </div>
          </div>
          <Card.Body>{projectData.description}</Card.Body>
          <div className="row" style={{ width: "100%" }}>
            <div className="col-md-12">
              <div
                className="d-flex justify-content-end align-content-center"
                style={{ alignContent: "center" }}
              >
                <Dropdown style={{ marginRight: "1rem" }}>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-tracker"
                    size="sm"
                  >
                    Tracker
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Feature</Dropdown.Item>
                    <Dropdown.Item>Bug</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown style={{ marginRight: "1rem" }}>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-status"
                    size="sm"
                  >
                    Status
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Open</Dropdown.Item>
                    <Dropdown.Item>Closed</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    // value={searchData}
                    name="search"
                    // onChange={(event) => {
                    //   setSearchData(event.target.value);
                    // }}
                    style={{ height: "2rem", marginRight: "1rem" }}
                  />
                  <Button
                    variant="outline-success"
                    size="sm"
                    type="submit"
                    style={{
                      height: "2rem",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
          <h5 style={{marginLeft:'1.5rem'}}>Issues</h5>
          <div className="mb-5">
          {projectData?.issues &&
            projectData?.issues?.map((item) => (
              <IssueCard
                key={item.id}
                id={item.id}
                tracker={item.tracker}
                description={item.description}
                createdAt={item.createdAt}
                status={item.status}
              />
            ))}
            </div>
        </Card>
      </div>
    </div>
  );
}

export default ViewProject;
