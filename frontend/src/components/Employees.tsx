import { useEffect, useState } from 'react';
// @ts-expect-error  - It works great in docker, but not in vscode
import { Employee, GetEmployeeListResponse } from '../types/types';
import Department from './Department';

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/employees');
      const result: GetEmployeeListResponse = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      setEmployees(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const employeesByDepartment = employees.reduce((acc: Record<string, Employee[]>, employee) => {
    const dept = employee.department;
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(employee);
    return acc;
  }, {});

  return (
    <div className="employees-page">
      {Object.entries(employeesByDepartment).map(([department, deptEmployees]) => (
        <Department
          key={department}
          name={department}
          employees={deptEmployees}
        />
      ))}
    </div>
  );
}