import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../component/NavBar/NavBar";
import { ApiServices } from "../../api/api";
import { Button, Card } from "react-bootstrap";
import DynamicModal from "../../component/DynamicModal/DynamicModal";

function ViewIssue() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [issueData, setIssueData] = React.useState({
    id: 0,
    tracker: "",
    description: "",
    projectId: 0,
    status: "",
    createdAt: "",
  });
  const [showModal, setShowModal] = React.useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleConfirmAction = async () => {
    await ApiServices.updateIssue(id, { status: "closed" })
      .then(async () => {
      })
      .catch((err) => {
        console.error(err);
      });
    handleCloseModal();
  };
  React.useEffect(() => {
    ApiServices.getIssue(id).then((res) => {
      setIssueData(res.data.data);
    });
  }, [id]);
  return (
    <div>
      <NavBar />
      <div className="container">
        <Card className="mt-5">
          <div style={{ marginLeft: "3rem", marginTop: "3rem" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h2>#{issueData.id}</h2>
              {issueData.status === "open" && (
                <Button
                  variant="secondary"
                  style={{ marginRight: "3rem" }}
                  onClick={handleOpenModal}
                >
                  Close Issue
                </Button>
              )}
            </div>
            <h5 style={{ marginTop: "3rem" }}>
              Tracker :- {issueData.tracker}
            </h5>
            <h6 style={{ marginTop: "5rem" }}>Description</h6>
            <Card.Body>{issueData.description}</Card.Body>
          </div>

          {/* Use the DynamicModal component */}
          <DynamicModal
            showModal={showModal}
            closeModal={handleCloseModal}
            onConfirm={handleConfirmAction}
            title="Confirmation"
            message="Are you sure you want to Change issue's status?"
            confirmText="Confirm"
          />
        </Card>
      </div>
    </div>
  );
}

export default ViewIssue;
