// @ts-expect-error  - It works great in docker, but not in vscode
import { Employee } from "../types/types";

const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const date = new Date(employee.dateStarted);
  const day = date.getDate();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).replace(day.toString(), `${day}${getOrdinalSuffix(day)}`);

  return (
    <div className="employee-card-row">
      <div className="employee-card-row-item col-20">
        <img
          src={employee.avatarUrl}
          alt={`${employee.firstName} ${employee.lastName}`}
          className="avatar"
        />
        <div className="employee-card-row-item-name">{`${employee.firstName} ${employee.lastName}`}</div>
      </div>
      <div className="employee-card-row-item col-15">
        <div className="start-date">
          {formattedDate}
        </div>
      </div>
      <div className="employee-card-row-item col-flex overflow-ellipsis">
        <div className="quote">{employee.quote}</div>
      </div>
      <div className="employee-card-row-item col-15">
        <div className={`status-badge ${employee.status}`}>{employee.status}</div>
      </div>
    </div>
  );
}
