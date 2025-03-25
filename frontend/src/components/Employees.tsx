import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// @ts-expect-error  - It works great in docker, but not in vscode
import { Employee, GetEmployeeListResponse } from "../types/types";
import Department from "./Department";

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const nameParam = params.get('name') || '';
    const statusParam = params.get('status') || 'all';
    setSearchTerm(nameParam);
    setStatusFilter(statusParam);
  }, [location.search]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set('name', searchTerm);
    } else {
      params.delete('name');
    }
    if (statusFilter !== 'all') {
      params.set('status', statusFilter);
    } else {
      params.delete('status');
    }
    const newUrl = `${location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [searchTerm, statusFilter, location.pathname, location.search]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3000/employees");
      const result: GetEmployeeListResponse = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      setEmployees(result.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch employees"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredEmployees = employees.filter((employee) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchLower) ||
      employee.lastName.toLowerCase().includes(searchLower);

    const matchesStatus =
      statusFilter === "all" ||
      employee.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const employeesByDepartment = filteredEmployees.reduce(
    (acc: Record<string, Employee[]>, employee) => {
      const dept = employee.department;
      if (!acc[dept]) {
        acc[dept] = [];
      }
      acc[dept].push(employee);
      return acc;
    },
    {}
  );

  return (
    <div className="employees-page">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by first or last name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      {filteredEmployees.length === 0 ? (
        <div>
          <p className="no-employees-found">
            <span>No employees found matching your search.</span>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="primary"
            >
              Clear Search
            </button>
          </p>
        </div>
      ) : (
        Object.entries(employeesByDepartment).map(
          ([department, deptEmployees]) => (
            <Department
              key={department}
              name={department}
              employees={deptEmployees}
            />
          )
        )
      )}
    </div>
  );
}
