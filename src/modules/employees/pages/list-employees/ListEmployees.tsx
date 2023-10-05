import React, { useEffect, useState } from "react";
import { IEmployee } from "../../models/IEmployee";
import { EmployeeService } from "../../services/EmployeeService";
import { Link } from "react-router-dom";
import { ToastUtil } from "../../../../util/ToastUtil";
import NoRecordFound from "../../../organizations/components/NoRecordFound";
import SpinnerUI from "../../components/SpinnerUI";
import ErrorMessage from "../../components/ErrorMessage";

interface IState {
  loading: boolean;
  errorMessage: string;
  employees: IEmployee[] | any;
}

const ListEmployees: React.FC = () => {
  const [search, setSearch] = useState("");
  const [state, setState] = useState<IState>({
    loading: false,
    errorMessage: "",
    employees: [] as IEmployee[],
  });

  const fetchAllEmployees = () => {
    setState({ ...state, loading: true });
    EmployeeService.getAllEmployees()
      .then((response: any) => {
        setState({
          ...state,
          loading: false,
          employees: response.data,
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
    fetchAllEmployees();
  }, []);

  const deleteEmployee = (id: any) => {
    EmployeeService.deleteEmployee(id)
      .then((response: any) => {
        if (response) {
          fetchAllEmployees();
          ToastUtil.displaySuccessToast("Employee is Deleted");
        }
      })
      .catch((error: any) => {
        ToastUtil.displayErrorToast(
          "Unable to Delete Employee From the Server"
        );
      });
  };

  let { loading, errorMessage, employees } = state;

  return (
    <>
      {loading && <SpinnerUI />}
      {errorMessage.length > 0 && <ErrorMessage message={errorMessage} />}
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-3">
            <form className="d-flex ">
              <input
                type="text"
                name="search"
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                className="form-control bg-light "
                placeholder="Search Here"
              />
            </form>
          </div>
        </div>
      </div>
      {employees.length > 0 ? (
        <div className="container mt-1">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header bg-success text-white text-center">
                  <h2>Employees Details</h2>
                </div>
                <div className="card-body bg-light">
                  <table className="table table-bordered table-hover tableData">
                    <thead>
                      <tr>
                        <th>EMP-ID</th>
                        <th>EMP-NAME</th>
                        <th>EMP-SAL</th>
                        <th>EMP-ADDR</th>
                        {/* <th>EMAIL</th> */}
                        <th>DEPT-CODE</th>
                        <th>ORG-CODE</th>
                        <th className="text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees
                        .filter((emp: any) =>
                          emp.employeeName
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        )
                        .map((employee: any) => {
                          return (
                            <tr key={employee.employeeId}>
                              <td>{employee.employeeId}</td>
                              <td>{employee.employeeName}</td>
                              <td>{employee.employeeSalary}</td>
                              <td>{employee.employeeAddress}</td>
                              {/* <td>{employee.email}</td> */}
                              <td>{employee.departmentCode}</td>
                              <td>{employee.organizationCode}</td>
                              <td className="text-center">
                                <button
                                  onClick={() =>
                                    deleteEmployee(employee.employeeId)
                                  }
                                  className="btn btn-danger ms-2"
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                                <Link
                                  to={`/update-employee/${employee.employeeId}`}
                                  className="btn btn-info ms-2"
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </Link>
                                <Link
                                  to={`/view-employee/${employee.employeeId}`}
                                  className="btn btn-dark ms-2"
                                >
                                  <i className="bi bi-eye"></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoRecordFound />
      )}
    </>
  );
};

export default ListEmployees;
