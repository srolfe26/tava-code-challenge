import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// @ts-expect-error  - It works great in docker, but not in vscode
import { Employee, GetEmployeeResponse } from '../types/types';

export default function EmployeeEditForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:3000/employees/${id}`);
      const result: GetEmployeeResponse = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      setEmployee(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch employee');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!employee) return;

    try {
      const response = await fetch(`http://localhost:3000/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      navigate('/employees');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update employee');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!employee) return;
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!employee) return <div>Employee not found</div>;

  return (
    <>
    <h1>Edit Employee</h1>
    <form onSubmit={handleSubmit} className="employee-edit-form">
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="dateStarted">Start Date</label>
        <input
          type="date"
          id="dateStarted"
          name="dateStarted"
          value={employee.dateStarted.split('T')[0]}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="department">Department</label>
        <input
          type="text"
          id="department"
          name="department"
          value={employee.department}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="quote">Quote</label>
        <textarea
          id="quote"
          name="quote"
          value={employee.quote}
          onChange={handleChange}
          required
          rows={4}
        />
      </div>
      <div className="form-actions">
        <button className="primary" type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate('/employees')}>Cancel</button>
      </div>
    </form>
    </>
  );
}