import React, { useEffect, useState } from "react";
import { IEmployee } from "../../models/IEmployee";
import { useParams } from "react-router-dom";
import { EmployeeService } from "../../services/EmployeeService";
import { Link } from "react-router-dom";
import SpinnerUI from "../../components/SpinnerUI";
import ErrorMessage from "../../components/ErrorMessage";

interface IState {
  loading: boolean;
  errorMessage: string;
  employee: IEmployee;
}

const ViewEmployee: React.FC = () => {
  let { id } = useParams();

  const [state, setState] = useState<IState>({
    loading: false,
    errorMessage: "",
    employee: {} as IEmployee,
  });

  const fetchEmployeeById = () => {
    setState({ ...state, loading: true });
    EmployeeService.getEmployeeById(id)
      .then((response: any) => {
        setState({
          ...state,
          loading: false,
          employee: response.data,
        });
      })
      .catch((error: any) => {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      });
  };

  useEffect(() => {
    fetchEmployeeById();
  }, [id]);

  let { loading, errorMessage, employee } = state;

  return (
    <>
      {loading && <SpinnerUI />}
      {errorMessage.length > 0 && <ErrorMessage message={errorMessage} />}
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card shadow-lg">
              <div className="card-header bg-secondary text-white text-center">
                <h2>Employee Data</h2>
              </div>
              <div className="card-body">
                <table className="table table-bordered table-hover tableData">
                  <tbody>
                    <tr>
                      <th>EMP-ID</th>
                      <td>{employee.employeeId}</td>
                    </tr>

                    <tr>
                      <th>EMP-NAME</th>
                      <td>{employee.employeeName}</td>
                    </tr>

                    <tr>
                      <th>EMP-SAL</th>
                      <td>{employee.employeeSalary}</td>
                    </tr>

                    <tr>
                      <th>EMP-ADDR</th>
                      <td>{employee.employeeAddress}</td>
                    </tr>

                    <tr>
                      <th>EMAIL</th>
                      <td>{employee.email}</td>
                    </tr>

                    <tr>
                      <th>DEPT-CODE</th>
                      <td>{employee.departmentCode}</td>
                    </tr>

                    <tr>
                      <th>ORG-CODE</th>
                      <td>{employee.organizationCode}</td>
                    </tr>
                  </tbody>
                </table>
                <Link to={"/employees"} className="btn btn-success">
                  <i className="bi bi-arrow-left-square"></i> Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEmployee;
