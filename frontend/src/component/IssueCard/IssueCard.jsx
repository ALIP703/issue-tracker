/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ApiServices } from "../../api/api";
import React from "react";
import DynamicModal from "../DynamicModal/DynamicModal";
import { useNavigate } from "react-router-dom";

function IssueCard(props) {
  const { id, tracker, description, status, createdAt, projectId, setProjectData } = props;
  const createdAtDate = new Date(createdAt);
  const formattedCreatedAt = createdAtDate.toLocaleString(); // Format based on user's locale
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleConfirmAction = async () => {
    await ApiServices.updateIssue(id, { status: "closed" })
      .then(async (res) => {
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
  return (
    <div className="container mt-3">
      <Card style={{ cursor: "pointer" }} onClick={()=>{
                navigate(`/issue?id=${id}`)

      }}>
        <div className="row" style={{ height: "4rem", alignItems: "center" }}>
          <div className="col-md-1" style={{ marginLeft: "3rem" }}>
            #{id}
          </div>
          <div className="col-md-2">{tracker}</div>
          <div className="col-md-3">
            {description.length > 25 ? (
              <>{description.slice(0, 20)}...</>
            ) : (
              description
            )}
          </div>
          <div className="col-md-3">{formattedCreatedAt}</div>
          <div className="col-md-2 justify-content-end">
            {/* Use the DynamicModal component */}
            <DynamicModal
              showModal={showModal}
              closeModal={handleCloseModal}
              onConfirm={handleConfirmAction}
              title="Confirmation"
              message="Are you sure you want to Change issue's status?"
              confirmText="Confirm"
            />
            {status === "open" ? (
              <Button
                variant="outline-success"
                size="sm"
                type="submit"
                style={{
                  height: "2rem",
                  justifyContent: "center",
                  alignContent: "center",
                }}
                onClick={handleOpenModal}
              >
                Close
              </Button>
            ) : (
              status
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default IssueCard;
