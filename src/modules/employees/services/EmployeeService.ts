import axios from "axios";
import { IEmployee } from "../models/IEmployee";
export class EmployeeService {
  private static serverUrl: string = `http://localhost:8081/api/employees`;

  public static getAllEmployees(): Promise<IEmployee[] | any> {
    return axios.get(`${this.serverUrl}`);
  }

  public static getEmployeeById(employeeId: any): Promise<IEmployee | any> {
    return axios.get(`${this.serverUrl}/${employeeId}`);
  }

  public static saveEmployee(employee: IEmployee): Promise<IEmployee> {
    return axios.post(`${this.serverUrl}`, employee);
  }

  public static updateEmployee(
    employeeId: any,
    employee: IEmployee
  ): Promise<IEmployee> {
    return axios.put(`${this.serverUrl}/${employeeId}`, employee);
  }

  public static deleteEmployee(employeeId: any): Promise<any> {
    return axios.delete(`${this.serverUrl}/${employeeId}`);
  }
}
