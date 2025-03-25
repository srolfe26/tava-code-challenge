import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeService } from "./employee.service";
import { Employee } from "../types/types";
import { data as initialData } from "../data";

describe("EmployeeService", () => {
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeService],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all employees", async () => {
      const result = await service.findAll();
      expect(result.data).toEqual(initialData);
    });
  });

  describe("findOne", () => {
    it("should return an employee when found", async () => {
      const testEmployee = initialData[0];
      const result = await service.findOne(testEmployee.id);
      expect(result.data).toEqual(testEmployee);
      expect(result.error).toBeUndefined();
    });

    it("should return error when employee not found", async () => {
      const result = await service.findOne(999999);
      expect(result.data).toBeNull();
      expect(result.error).toBe("Employee not found");
    });
  });

  describe("update", () => {
    it("should update an existing employee", async () => {
      const testEmployee = initialData[0];
      const updateData: Partial<Employee> = {
        firstName: "Updated",
        lastName: "Name",
        department: "Engineering",
        dateStarted: "2024-01-01",
        quote: "New quote",
        status: "active",
        avatarUrl: "https://example.com/new-avatar.jpg",
      };

      const result = await service.update(testEmployee.id, updateData);
      expect(result.data).toBeDefined();
      expect(result.data?.firstName).toBe(updateData.firstName);
      expect(result.data?.lastName).toBe(updateData.lastName);
      expect(result.error).toBeUndefined();
    });

    it("should return error when updating non-existent employee", async () => {
      const updateData: Partial<Employee> = {
        firstName: "Updated",
        lastName: "Name",
        department: "Engineering",
        dateStarted: "2024-01-01",
        quote: "New quote",
        status: "active",
        avatarUrl: "https://example.com/new-avatar.jpg",
      };

      const result = await service.update(999999, updateData);
      expect(result.data).toBeNull();
      expect(result.error).toBe("Employee not found");
    });
  });

  describe("delete", () => {
    it("should soft delete an existing employee", async () => {
      const testEmployee = initialData[0];
      const result = await service.delete(testEmployee.id);
      expect(result.data).toBe(true);
      expect(result.error).toBeUndefined();

      // Verify the employee is marked as inactive
      const findResult = await service.findOne(testEmployee.id);
      expect(findResult.data?.status).toBe("inactive");
    });

    it("should return error when deleting non-existent employee", async () => {
      const result = await service.delete(999999);
      expect(result.data).toBe(false);
      expect(result.error).toBe("Employee not found");
    });
  });
});
