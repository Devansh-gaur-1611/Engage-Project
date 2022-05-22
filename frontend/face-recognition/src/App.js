import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import AdminPanelLogin from "./pages/adminlogin";
import UserLogin from "./pages/userlogin";
import ProfilePage from "./components/profilePage/ProfilePage";
import Department from "./components/department/Department";
import EmployeesPage from "./components/employees/Employees"

import AddParticipants from "./components/addParticipants/AddParticipants";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adminlogin" element={<AdminPanelLogin />} />
          <Route exact path="/login" element={<UserLogin />} />
          <Route exact path="/department" element={<Department />} />
          <Route exact path={`/department/:classId`} element={<EmployeesPage />} />
          <Route exact path={`/userprofile/:userId`} element={<ProfilePage />} />
          <Route exact path={`/:className/addParticipants`} element={<AddParticipants />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
