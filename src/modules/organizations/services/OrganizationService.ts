import axios from "axios";
import { IOrganization } from "../models/IOrganization";

export class OrganizationService {
  public static serverUrl: string = `http://localhost:8083/api/organizations`;

  public static getAllOrganizations(): Promise<IOrganization[] | any> {
    return axios.get(`${this.serverUrl}`);
  }

  public static getOrganizationById(
    organizationId: any
  ): Promise<IOrganization | any> {
    return axios.get(`${this.serverUrl}/${organizationId}`);
  }

  public static saveOrganization(
    organization: IOrganization
  ): Promise<IOrganization> {
    return axios.post(`${this.serverUrl}`, organization);
  }

  public static updateOrganization(
    organizationId: any,
    organization: IOrganization
  ): Promise<IOrganization> {
    return axios.put(`${this.serverUrl}/${organizationId}`, organization);
  }

  public static deleteOrganization(organizationId: any): Promise<any> {
    return axios.delete(`${this.serverUrl}/${organizationId}`);
  }
}
