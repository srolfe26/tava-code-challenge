// API Response types
import { Employee } from "./types";

export type ApiResponse<T> = {
  data: T;
  error?: string;
};


export type GetEmployeeResponse = ApiResponse<Employee>;
export type GetEmployeeListResponse = ApiResponse<Employee[]>;
export type UpdateEmployeeRequest = {
  id: number;
  data: Partial<Employee>;
};
export type UpdateEmployeeResponse = ApiResponse<Employee>;

export type ApiError = {
  message: string;
  code?: string;
};
