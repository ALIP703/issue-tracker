import React from "react";
import { ApiServices } from "../../api/api";

function HomePage() {
  React.useEffect(() => {
    ApiServices.projects()
      .then((res) => {
        console.log(res);
      })
      .catch();
  }, []);
  return <div>home</div>;
}

export default HomePage;
