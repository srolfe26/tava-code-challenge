import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Payroll from "./Payroll";
import Employees from "./Employees";
import EmployeeEditForm from "./EmployeeEditForm";
import logo from "../assets/logo.png";
import "../styles/components.css";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <div>
          <NavLink
            to="/payroll"
            className={({ isActive }) => (isActive ? "current-page" : "")}
          >
            Payroll
          </NavLink>
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              isActive || window.location.pathname.startsWith("/employees/")
                ? "current-page"
                : ""
            }
          >
            Employees
          </NavLink>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeEditForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
