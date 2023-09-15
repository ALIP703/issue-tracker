import React from "react";
import { ApiServices } from "../../api/api";
import NavBar from "../../component/NavBar/NavBar";
import ProjectCard from "../../component/ProjectCard/ProjectCard";
import "./HomePage.css";

function HomePage() {
  const [projects, setProjects] = React.useState([]);
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
