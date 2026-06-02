import { ConflictError, NotFoundError } from "@shared/errors/app.error";
import { EmployeeService } from "../employee.service";
import { EmployeeRepository } from "../employee.repository.interface";

describe("EmployeeService", () => {

  let repositoryMock: jest.Mocked<EmployeeRepository>;
  let service: EmployeeService;

  beforeEach(() => {
    repositoryMock = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findByEmployeeCode: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    service = new EmployeeService(repositoryMock);
  });

  describe("Create Employee", () => {

    it("should create an employee successfully", async () => {
      const employeePayload = {
        employeeCode: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        country: "India",
        department: "Engineering",
        jobTitle: "Software Engineer",
        salary: 50000,
        currency: "INR",
        employmentType: "FULL_TIME",
        dateOfJoining: "2024-01-01",
      };

      const createdEmployee = {
        id: "employee-id",
        ...employeePayload,
      };

      const createRepositoryMock = {
        ...repositoryMock,
        findByEmail: jest.fn().mockResolvedValue(null),
        findByEmployeeCode: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue(createdEmployee),
      };

      // service does not exist yet
      const service = new EmployeeService(createRepositoryMock);

      const result = await service.createEmployee(employeePayload);

      expect(createRepositoryMock.findByEmail).toHaveBeenCalledWith(
        employeePayload.email,
      );

      expect(createRepositoryMock.findByEmployeeCode).toHaveBeenCalledWith(
        employeePayload.employeeCode,
      );

      expect(createRepositoryMock.create).toHaveBeenCalled();

      expect(result).toEqual(createdEmployee);
    });

    it("should throw an error when email already exists", async () => {
      const employeePayload = {
        employeeCode: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        country: "India",
        department: "Engineering",
        jobTitle: "Software Engineer",
        salary: 50000,
        currency: "INR",
        employmentType: "FULL_TIME",
        dateOfJoining: "2024-01-01",
      };

      const existingEmployee = {
        id: "existing-id",
        email: "john.doe@example.com",
      };

      const createRepositoryMock = {
        ...repositoryMock,
        findByEmail: jest.fn().mockResolvedValue(existingEmployee),
        findByEmployeeCode: jest.fn(),
        create: jest.fn(),
      };

      const service = new EmployeeService(createRepositoryMock);

      await expect(
        service.createEmployee(employeePayload),
      ).rejects.toThrow(ConflictError);

      expect(createRepositoryMock.create).not.toHaveBeenCalled();
    });

    it("should throw an error when employee code already exists", async () => {
      const employeePayload = {
        employeeCode: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        country: "India",
        department: "Engineering",
        jobTitle: "Software Engineer",
        salary: 50000,
        currency: "INR",
        employmentType: "FULL_TIME",
        dateOfJoining: "2024-01-01",
      };

      const existingEmployee = {
        id: "existing-id",
        employeeCode: "EMP001",
      };

      const createRepositoryMock = {
        ...repositoryMock,
        findByEmail: jest.fn().mockResolvedValue(null),
        findByEmployeeCode: jest.fn().mockResolvedValue(existingEmployee),
        create: jest.fn(),
      };

      const service = new EmployeeService(createRepositoryMock);

      await expect(
        service.createEmployee(employeePayload),
      ).rejects.toThrow(ConflictError);

      expect(createRepositoryMock.create).not.toHaveBeenCalled();
    });

  });


  describe("Update Employee", () => {

    it("should update employee successfully", async () => {
      const employeeId = "employee-id";

      const existingEmployee = {
        id: employeeId,
        employeeCode: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        country: "India",
        department: "Engineering",
        jobTitle: "Software Engineer",
        salary: 50000,
        currency: "INR",
        employmentType: "FULL_TIME",
        dateOfJoining: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatePayload = {
        salary: 70000,
        jobTitle: "Senior Software Engineer",
      };

      const updatedEmployee = {
        ...existingEmployee,
        ...updatePayload,
      };

      const updateRepositoryMock = {
        ...repositoryMock,
        findById: jest.fn().mockResolvedValue(existingEmployee),
        update: jest.fn().mockResolvedValue(updatedEmployee),
      };

      const service = new EmployeeService(updateRepositoryMock);

      const result = await service.updateEmployee(
        employeeId,
        updatePayload,
      );

      expect(updateRepositoryMock.findById).toHaveBeenCalledWith(
        employeeId,
      );

      expect(updateRepositoryMock.update).toHaveBeenCalledWith(
        employeeId,
        updatePayload,
      );

      expect(result.salary).toBe(70000);

      expect(result.jobTitle).toBe(
        "Senior Software Engineer",
      );
    });

    it("should throw NotFoundError when employee does not exist", async () => {
      const updateRepositoryMock = {
        ...repositoryMock,
        findById: jest.fn().mockResolvedValue(null),
        update: jest.fn(),
      };

      const service = new EmployeeService(updateRepositoryMock);

      await expect(
        service.updateEmployee("missing-id", {
          salary: 70000,
        }),
      ).rejects.toThrow(NotFoundError);

      expect(updateRepositoryMock.update).not.toHaveBeenCalled();
    });
  });

  describe("Delete Employee", () => {
    it("Should be able to delete employee", async () => {

      const employeeId = "emp-001";

      const existingEmployee = {
        employeeCode: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        country: "India",
        department: "Engineering",
        jobTitle: "Software Engineer",
        salary: 50000,
        currency: "INR",
        employmentType: "FULL_TIME",
        dateOfJoining: "2024-01-01",
        id: employeeId
      };

      const deleteEmployeeMockRepo = {
        ...repositoryMock,
        findById: jest.fn().mockResolvedValue(existingEmployee),
        delete: jest.fn()
      };
      const service = new EmployeeService(deleteEmployeeMockRepo);

      await service.deleteEmployee(
        employeeId
      );

      expect(deleteEmployeeMockRepo.findById).toHaveBeenCalledWith(
        employeeId
      );

      expect(deleteEmployeeMockRepo.delete).toHaveBeenCalledWith(
        employeeId
      );

    });


    it("should throw NotFoundError when employee does not exist", async () => {

      const employeeId = "emp-001";

      const existingEmployee = {
        employeeCode: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        country: "India",
        department: "Engineering",
        jobTitle: "Software Engineer",
        salary: 50000,
        currency: "INR",
        employmentType: "FULL_TIME",
        dateOfJoining: "2024-01-01",
        id: employeeId
      };

      const deleteEmployeeMockRepo = {
        ...repositoryMock,
        findById: jest.fn(),
        delete: jest.fn()
      };
      const service = new EmployeeService(deleteEmployeeMockRepo);

      await expect(
        service.deleteEmployee(employeeId),
      ).rejects.toThrow(NotFoundError);

      expect(deleteEmployeeMockRepo.delete).not.toHaveBeenCalledWith(
        employeeId
      );

    });
  });

  describe("Get Employee by id", () => {

    it("should get employee by id if exists", async () => {

      const employeeId = "emp-001";
      const existingEmployee = {
        employeeCode: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        country: "India",
        department: "Engineering",
        jobTitle: "Software Engineer",
        salary: 50000,
        currency: "INR",
        employmentType: "FULL_TIME",
        dateOfJoining: "2024-01-01",
        id: employeeId
      };

      const getEmployeeByIdMockRepository = {
        ...repositoryMock,
        findById: jest.fn().mockResolvedValue(existingEmployee),
      };

      const service = new EmployeeService(getEmployeeByIdMockRepository);
      await service.getEmployeeById(employeeId);
      expect(getEmployeeByIdMockRepository.findById).toHaveBeenCalledWith(employeeId);

    });

     it("should throw NoFoundError if employee does not exists", async () => {

      const employeeId = "emp-001";

      const getEmployeeByIdMockRepository = {
        ...repositoryMock,
        findById: jest.fn(),
      };

      const service = new EmployeeService(getEmployeeByIdMockRepository);
      await expect(
        service.getEmployeeById(employeeId)
      ).rejects.toThrow(NotFoundError);
      
      expect(getEmployeeByIdMockRepository.findById).toHaveBeenCalledWith(employeeId);
    });


  });

});