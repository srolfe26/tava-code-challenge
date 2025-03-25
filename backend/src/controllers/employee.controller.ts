import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../types/types';
import { ApiResponse, GetEmployeeResponse, GetEmployeeListResponse, UpdateEmployeeRequest, UpdateEmployeeResponse } from '../types/crud';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async findAll(): Promise<GetEmployeeListResponse> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetEmployeeResponse> {
    return this.employeeService.findOne(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeRequest: UpdateEmployeeRequest['data'],
  ): Promise<UpdateEmployeeResponse> {
    return this.employeeService.update(Number(id), updateEmployeeRequest);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ApiResponse<boolean>> {
    return this.employeeService.delete(Number(id));
  }
}