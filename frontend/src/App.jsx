import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
