export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  dateStarted: string;
  quote: string;
  status: 'active' | 'inactive';
  avatarUrl: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// CRUD Operation types
export interface GetEmployeeResponse extends ApiResponse<Employee> {}
export interface GetEmployeeListResponse extends ApiResponse<Employee[]> {}
export interface UpdateEmployeeRequest {
  id: number;
  data: Partial<Employee>;
}
export interface UpdateEmployeeResponse extends ApiResponse<Employee> {}

// API Error type
export interface ApiError {
  message: string;
  code?: string;
}
