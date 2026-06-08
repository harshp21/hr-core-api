import { employeeSchema } from '../employee.schema';

describe('Employee Schema', () => {
  it('should validate a valid employee payload', () => {
    // arrange
    const employee = {
      employeeCode: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      country: 'India',
      department: 'Engineering',
      jobTitle: 'Software Engineer',
      salary: 50000,
      currency: 'INR',
      employmentType: 'FULL_TIME',
      dateOfJoining: '2024-01-01',
    };

    const result = employeeSchema.safeParse(employee);
    expect(result.success).toBe(true);
  });

  it('should fail when firstName is missing', () => {
    const employee = {
      employeeCode: 'EMP001',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      country: 'India',
      department: 'Engineering',
      jobTitle: 'Software Engineer',
      salary: 50000,
      currency: 'INR',
      employmentType: 'FULL_TIME',
      dateOfJoining: '2024-01-01',
      firstName: '',
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });

  it('should fail when salary is less than or equal to zero', () => {
    const employee = {
      employeeCode: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      country: 'India',
      department: 'Engineering',
      jobTitle: 'Software Engineer',
      salary: 0,
      currency: 'INR',
      employmentType: 'FULL_TIME',
      dateOfJoining: '2024-01-01',
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });

  it('should fail when email is invalid', () => {
    const employee = {
      employeeCode: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      country: 'India',
      department: 'Engineering',
      jobTitle: 'Software Engineer',
      salary: 0,
      currency: 'INR',
      employmentType: 'FULL_TIME',
      dateOfJoining: '2024-01-01',
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });

  it('should fail when lastName is missing', () => {
    const employee = {
      employeeCode: 'EMP001',
      firstName: 'John',
      email: 'john.doe@example.com',
      country: 'India',
      department: 'Engineering',
      jobTitle: 'Software Engineer',
      salary: 50000,
      currency: 'INR',
      employmentType: 'FULL_TIME',
      dateOfJoining: '2024-01-01',
      lastName: '',
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });

  it('should fail when employeeCode is missing', () => {
    const employee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      country: 'India',
      department: 'Engineering',
      jobTitle: 'Software Engineer',
      salary: 50000,
      currency: 'INR',
      employmentType: 'FULL_TIME',
      dateOfJoining: '2024-01-01',
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });

  it('should fail when department is missing', () => {
    const employee = {
      employeeCode: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      country: 'India',
      jobTitle: 'Software Engineer',
      salary: 50000,
      currency: 'INR',
      employmentType: 'FULL_TIME',
      dateOfJoining: '2024-01-01',
    };

    const result = employeeSchema.safeParse(employee);

    expect(result.success).toBe(false);
  });
});
