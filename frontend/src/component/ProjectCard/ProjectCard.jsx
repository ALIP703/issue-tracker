/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function ProjectCard(props) {
  const { id, name, description, status, issueCount } = props;
  const navigate = useNavigate();
  return (
    <div>
      <Card
        style={{ marginTop: "1rem", cursor: "pointer" }}
        onClick={() => {
          navigate(`/project?id=${id}`);
        }}
      >
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1>&nbsp;&nbsp;&nbsp;{name}</h1>
            </div>
            <div>
              <p>Number of Open issue: {issueCount}</p>
              <p>Status: {status}</p>
            </div>
          </div>
          <Card.Text>&nbsp;&nbsp;&nbsp;{description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProjectCard;
