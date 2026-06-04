import { HttpStatus } from "@shared/constants/httpStatus";
import { NextFunction, Request, Response } from "express";
import { apiResponse } from "@shared/utils/apiResponse";
import { AnalyticsService } from "../analytics.service";
import { AnalyticsController } from "../analytics.controller";

describe("AnalyticsController", () => {
  let serviceMock: jest.Mocked<AnalyticsService>;
  let controller: AnalyticsController;

  type MockResponse = {
    status: jest.Mock;
    json: jest.Mock;
  };

  beforeEach(() => {
    serviceMock = {
      getCountrySalaryInsights: jest.fn(),
      getJobTitleSalaryInsights: jest.fn(),
      getDepartmentInsights: jest.fn(),
    } as unknown as jest.Mocked<AnalyticsService>;

    controller = new AnalyticsController(
      serviceMock,
    );
  });

  it("should return country salary insights", async () => {
    const insights = [
      {
        country: "India",
        employeeCount: 2,
        averageSalary: 150000,
        minimumSalary: 100000,
        maximumSalary: 200000,
      },
    ];

    const req = {} as Request;

    const res: MockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next: NextFunction = jest.fn();

    serviceMock.getCountrySalaryInsights
      .mockResolvedValue(insights);

    await controller.getCountrySalaryInsights(
      req,
      res as unknown as Response,
      next,
    );

    expect(
      serviceMock.getCountrySalaryInsights,
    ).toHaveBeenCalled();

    expect(res.status)
      .toHaveBeenCalledWith(HttpStatus.OK);

    expect(res.json)
      .toHaveBeenCalledWith(
        apiResponse(
          insights,
          "Country salary insights retrieved successfully",
        ),
      );
  });

  it("should return job title salary insights", async () => {
    const insights = [
      {
        jobTitle: "Software Engineer",
        averageSalary: 150000,
      },
    ];

    const req = {
      query: {
        country: "India",
      },
    };

    const res: MockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next: NextFunction = jest.fn();

    serviceMock.getJobTitleSalaryInsights
      .mockResolvedValue(insights);

    const typedReq = req as unknown as Request;
    const typedRes = res as unknown as Response;

    await controller.getJobTitleSalaryInsights(
      typedReq,
      typedRes,
      next,
    );

    expect(
      serviceMock.getJobTitleSalaryInsights,
    ).toHaveBeenCalledWith(
      "India",
    );

    expect(res.status)
      .toHaveBeenCalledWith(
        HttpStatus.OK,
      );

    expect(res.json)
      .toHaveBeenCalledWith(
        apiResponse(
          insights,
          "Job title salary insights retrieved successfully",
        ),
      );
  });

  it("should return department insights", async () => {
    const insights = [
      {
        department: "Engineering",
        averageSalary: 100000,
        employeeCount: 10,
      },
    ];

    serviceMock.getDepartmentInsights.mockResolvedValue(
      insights,
    );

    const req = {};

    const res: MockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next: NextFunction = jest.fn();


    const typedReq = req as unknown as Request;
    const typedRes = res as unknown as Response;

    await controller.getDepartmentInsights(
      typedReq,
      typedRes,
      next,
    );

    expect(
      serviceMock.getDepartmentInsights,
    ).toHaveBeenCalled();

    expect(res.status)
      .toHaveBeenCalledWith(HttpStatus.OK);

    expect(res.json)
      .toHaveBeenCalledWith(
        apiResponse(
          insights,
          "Department salary insights retrieved successfully",
        ),
      );
  });
});