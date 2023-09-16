/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function IssueCard(props) {
  const { id, tracker, description, status, createdAt } = props;
  const createdAtDate = new Date(createdAt);
  const formattedCreatedAt = createdAtDate.toLocaleString(); // Format based on user's locale
  
  return (
    <div className="container mt-3">
      <Card style={{cursor:'pointer'}}>
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
