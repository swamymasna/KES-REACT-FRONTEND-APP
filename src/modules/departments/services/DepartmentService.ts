import axios from "axios";
import { IDepartment } from "../models/IDepartment";

export class DepartmentService {
  private static serverUrl: string = `http://localhost:8082/api/departments`;

  public static getAllDepartments(): Promise<IDepartment[] | any> {
    return axios.get(`${this.serverUrl}`);
  }

  public static getDepartmentById(
    departmentId: any
  ): Promise<IDepartment | any> {
    return axios.get(`${this.serverUrl}/${departmentId}`);
  }

  public static saveDepartment(department: IDepartment): Promise<IDepartment> {
    return axios.post(`${this.serverUrl}`, department);
  }

  public static updateDepartment(
    departmentId: any,
    department: IDepartment
  ): Promise<IDepartment> {
    return axios.put(`${this.serverUrl}/${departmentId}`, department);
  }

  public static deleteDepartment(departmentId: any): Promise<any> {
    return axios.delete(`${this.serverUrl}/${departmentId}`);
  }
}
