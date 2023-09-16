import React from "react";
import NavBar from "../../component/NavBar/NavBar";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiServices } from "../../api/api";
import Card from "react-bootstrap/Card";
import "./ViewProject.css";
import IssueCard from "../../component/IssueCard/IssueCard";
import DynamicModal from "../../component/DynamicModal/DynamicModal";
import { Form } from "react-bootstrap";

function ViewProject() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get("id");
  const [issueSearchData, setIssueSearchData] = React.useState({
    search: null,
    tracker: null,
    status: null,
  });
  const navigate = useNavigate();

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

  const handleFilterChange = (event, issueSearchData, setIssueSearchData) => {
    const { name, value } = event.target;
    // Check if the value is an empty string and set it to null if true
    const newValue = value === "" ? null : value;
    if (issueSearchData) {
      setIssueSearchData({
        ...issueSearchData,
        [name]: newValue,
      });
    }
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

              <Button variant="secondary" style={{ marginRight: "1rem" }} onClick={()=>{
                navigate(`/add-issue?projectId=${projectData.id}`)
              }}>
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
                <form
                  className="d-flex"
                  onSubmit={(event) => {
                    handleSearch(event, issueSearchData);
                  }}
                >
                  <Form.Select
                    size="sm"
                    style={{ marginRight: "1rem" }}
                    name="tracker"
                    onChange={(event) => {
                      handleFilterChange(
                        event,
                        issueSearchData,
                        setIssueSearchData
                      );
                    }}
                  >
                    <option value="">Tracker</option>
                    <option value="Bug">Bug</option>
                    <option value="Feature">Feature</option>
                  </Form.Select>
                  <Form.Select
                    size="sm"
                    style={{ marginRight: "1rem" }}
                    name="status"
                    onChange={(event) => {
                      handleFilterChange(
                        event,
                        issueSearchData,
                        setIssueSearchData
                      );
                    }}
                  >
                    <option value="">Status</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </Form.Select>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={issueSearchData.search}
                    name="search"
                    onChange={(event) => {
                      handleFilterChange(
                        event,
                        issueSearchData,
                        setIssueSearchData
                      );
                    }}
                    style={{
                      height: "2rem",
                      marginRight: "1rem",
                      width: "200px",
                    }}
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
                  projectId={projectData.id}
                  setProjectData={setProjectData}
                />
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ViewProject;
