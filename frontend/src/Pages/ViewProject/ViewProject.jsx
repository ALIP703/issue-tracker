import React from "react";
import NavBar from "../../component/NavBar/NavBar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useLocation } from "react-router-dom";
import { ApiServices } from "../../api/api";
import Card from "react-bootstrap/Card";
import "./ViewProject.css";
import IssueCard from "../../component/IssueCard/IssueCard";
import DynamicModal from "../../component/DynamicModal/DynamicModal";

function ViewProject() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get("id");
  const [issueSearchData, setIssueSearchData] = React.useState("");

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
  const handleOpenProject = async () => {
    await ApiServices.updateProject(projectData.id, { status: "open" })
      .then(async (res) => {
        console.log(res);
        if (res.status === 200) {
          ApiServices.project(projectId).then((res) => {
            setProjectData(res.data.data);
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const [showModal, setShowModal] = React.useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleConfirmAction = async () => {
    await ApiServices.updateProject(projectData.id, { status: "closed" })
      .then(async (res) => {
        console.log(res);
        if (res.status === 200) {
          ApiServices.project(projectId).then((res) => {
            setProjectData(res.data.data);
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
    handleCloseModal();
  };
  const handleSearch = async (event, searchData) => {
    event.preventDefault();
    ApiServices.issuesBySearch(searchData)
      .then((res) => {
        setProjectData({ ...projectData, issues: res.data.data });
      })
      .catch(() => {
        setProjectData({
          ...projectData,
          issues: null,
        });
      });
  };

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
              {/* Use the DynamicModal component */}
              <DynamicModal
                showModal={showModal}
                closeModal={handleCloseModal}
                onConfirm={handleConfirmAction}
                title="Confirmation"
                message="Are you sure you want to Change project status?"
                confirmText="Confirm"
              />
              {projectData?.status === "open" ? (
                <Button
                  variant="danger"
                  style={{ marginRight: "1rem" }}
                  // onClick={() => {
                  //   handleCloseProject();
                  // }}
                  onClick={handleOpenModal}
                >
                  Close Project
                </Button>
              ) : (
                <Button
                  style={{ marginRight: "1rem" }}
                  onClick={() => {
                    handleOpenProject();
                  }}
                >
                  Reopen project
                </Button>
              )}

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
                <form
                  className="d-flex"
                  onSubmit={(event) => {
                    handleSearch(event, issueSearchData);
                  }}
                >
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={issueSearchData}
                    name="search"
                    onChange={(event) => {
                      setIssueSearchData(event.target.value);
                    }}
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
          <h5 style={{ marginLeft: "1.5rem" }}>Issues</h5>
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
