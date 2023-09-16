import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage/HomePage";
import AddProject from "./Pages/AddProject/AddProject";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ViewProject from "./Pages/ViewProject/ViewProject";
import AddIssue from "./Pages/AddIssue/AddIssue";
import ViewIssue from "./Pages/ViewIssue/ViewIssue";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/project" element={<ViewProject />} />
        <Route path="/add-issue" element={<AddIssue />} />
        <Route path="/issue" element={<ViewIssue />} />
      </Routes>
    </>
  );
}

export default App;
