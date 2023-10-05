import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IEmployee } from "../../models/IEmployee";
import { IDepartment } from "../../../departments/models/IDepartment";
import { IOrganization } from "../../../organizations/models/IOrganization";
import { EmployeeService } from "../../services/EmployeeService";
import { DepartmentService } from "../../../departments/services/DepartmentService";
import { OrganizationService } from "../../../organizations/services/OrganizationService";
import { useNavigate } from "react-router-dom";
import { ToastUtil } from "../../../../util/ToastUtil";

interface IDepartmentState {
  loading: boolean;
  errorMessage: string;
  departments: IDepartment[];
}

interface IOrganizationState {
  loading: boolean;
  errorMessage: string;
  organizations: IOrganization[];
}

const CreateEmployee: React.FC = () => {
  let navigate = useNavigate();

  let [employee, setEmployees] = useState<IEmployee>({
    employeeName: "",
    employeeSalary: "",
    employeeAddress: "",
    email: "",
    departmentCode: "",
    organizationCode: "",
  });

  let [dept, setDept] = useState<IDepartmentState>({
    loading: false,
    errorMessage: "",
    departments: [] as IDepartment[],
  });

  let [org, setOrg] = useState<IOrganizationState>({
    loading: false,
    errorMessage: "",
    organizations: [] as IOrganization[],
  });

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    setEmployees({
      ...employee,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement | any>) => {
    event.preventDefault();
    EmployeeService.saveEmployee(employee)
      .then((response: any) => {
        if (response) {
          navigate("/employees");
          ToastUtil.displaySuccessToast("Employee is Saved");
        }
      })
      .catch((error: any) => {
        ToastUtil.displayErrorToast("Unable to Save Employee into the Server");
      });
  };

  const fetchAllDepartments = () => {
    DepartmentService.getAllDepartments()
      .then((response: any) => {
        setDept({
          ...dept,
          loading: false,
          departments: response.data,
        });
      })
      .catch((error: any) => {
        setOrg({
          ...org,
          loading: false,
          errorMessage: error.message,
        });
      });
  };

  const fetchAllOrganizations = () => {
    OrganizationService.getAllOrganizations()
      .then((response: any) => {
        setOrg({
          ...org,
          loading: false,
          organizations: response.data,
        });
      })
      .catch((error: any) => {
        setOrg({
          ...org,
          loading: false,
          errorMessage: error.message,
        });
      });
  };

  useEffect(() => {
    fetchAllDepartments();
    fetchAllOrganizations();
  }, []);

  let { departments } = dept;
  let { organizations } = org;

  let {
    employeeName,
    employeeSalary,
    employeeAddress,
    email,
    departmentCode,
    organizationCode,
  } = employee;

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card shadow-lg">
              <div className="card-header bg-warning text-center">
                <h2>Register Employee</h2>
              </div>
              <div className="card-body bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={employeeName}
                      name="employeeName"
                      onChange={onInputChange}
                      placeholder="Enter Employee Name"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      value={employeeSalary}
                      name="employeeSalary"
                      onChange={onInputChange}
                      placeholder="Enter Employee Salary"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      value={employeeAddress}
                      name="employeeAddress"
                      onChange={onInputChange}
                      placeholder="Enter Employee Address"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      value={email}
                      name="email"
                      onChange={onInputChange}
                      placeholder="Enter Employee EmailId"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <select
                      value={departmentCode}
                      name="departmentCode"
                      onChange={onInputChange}
                      className="form-control"
                    >
                      <option value="">Select Department</option>

                      {departments.map((department) => {
                        return (
                          <option
                            key={department.departmentId}
                            value={department.departmentCode}
                          >
                            {department.departmentCode}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mt-2">
                    <select
                      value={organizationCode}
                      name="organizationCode"
                      onChange={onInputChange}
                      className="form-control"
                    >
                      <option value="">Select Organization</option>
                      {organizations.map((organization) => {
                        return (
                          <option
                            key={organization.organizationId}
                            value={organization.organizationCode}
                          >
                            {organization.organizationCode}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mt-2">
                    <input
                      type="submit"
                      value={"Register"}
                      className="btn btn-warning form-control"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEmployee;
