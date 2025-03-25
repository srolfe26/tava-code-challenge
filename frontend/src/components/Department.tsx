// @ts-expect-error  - It works great in docker, but not in vscode
import { Employee } from '../types/types';
import EmployeeCard from './EmployeeCard';

interface DepartmentProps {
  name: string;
  employees: Employee[];
}

export default function Department({ name, employees }: DepartmentProps) {
  return (
    <section className="department">
      <h2>{name}</h2>
      <div className="employee-list">
        <div className="employee-list-header">
          <div className="employee-list-header-item col-20">Name</div>
          <div className="employee-list-header-item col-15">Start Date</div>
          <div className="employee-list-header-item col-flex">Quote</div>
          <div className="employee-list-header-item col-15">Status</div>
        </div>
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </section>
  );
}