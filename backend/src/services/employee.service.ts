import { Injectable } from '@nestjs/common';
import { Employee } from '../types/types';
import { ApiResponse, GetEmployeeResponse, GetEmployeeListResponse, UpdateEmployeeResponse } from '../types/crud';
import { data as initialData } from '../data';

@Injectable()
export class EmployeeService {
  private employees: Employee[] = [];

  constructor() {
    this.employees = [...initialData];
  }

  async findAll(): Promise<GetEmployeeListResponse> {
    return {
      data: this.employees,
    };
  }

  async findOne(id: number): Promise<GetEmployeeResponse> {
    const employee = this.employees.find(emp => emp.id === id);
    if (!employee) {
      return {
        data: null,
        error: 'Employee not found',
      };
    }
    return {
      data: employee,
    };
  }

  async update(id: number, updateData: Partial<Employee>): Promise<UpdateEmployeeResponse> {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index === -1) {
      return {
        data: null,
        error: 'Employee not found',
      };
    }

    this.employees[index] = {
      ...this.employees[index],
      ...updateData,
      id,
    };

    return {
      data: this.employees[index],
    };
  }

  async delete(id: number): Promise<ApiResponse<boolean>> {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index === -1) {
      return {
        data: false,
        error: 'Employee not found',
      };
    }

    this.employees[index] = {
      ...this.employees[index],
      status: 'inactive',
    };

    return {
      data: true,
    };
  }
}