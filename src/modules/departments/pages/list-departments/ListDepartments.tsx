import React, { useEffect, useState } from "react";
import { IDepartment } from "../../models/IDepartment";
import { DepartmentService } from "../../services/DepartmentService";
import NoRecordFound from "../../../organizations/components/NoRecordFound";
import { Link } from "react-router-dom";
import { ToastUtil } from "../../../../util/ToastUtil";
import SpinnerUI from "../../../employees/components/SpinnerUI";
import ErrorMessage from "../../../employees/components/ErrorMessage";

interface IState {
  loading: boolean;
  errorMessage: string;
  departments: IDepartment[];
}

const ListDepartments: React.FC = () => {
  const [state, setState] = useState<IState>({
    loading: false,
    errorMessage: "",
    departments: [] as IDepartment[],
  });

  const fetchAllDepartments = () => {
    setState({ ...state, loading: true });
    DepartmentService.getAllDepartments()
      .then((response: any) => {
        setState({
          ...state,
          loading: false,
          departments: response.data,
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
    fetchAllDepartments();
  }, []);

  const deleteDepartment = (id: any) => {
    DepartmentService.deleteDepartment(id)
      .then((response: any) => {
        if (response) {
          fetchAllDepartments();
          ToastUtil.displayInfoToast("Department is Deleted");
        }
      })
      .catch((error: any) => {
        console.log(error);
        if (error && error.response) {
          ToastUtil.displayErrorToast(
            "Unable to Delete Department from the Server"
          );
        }
      });
  };

  let { errorMessage, loading, departments } = state;

  return (
    <>
      {loading && <SpinnerUI />}
      {errorMessage.length > 0 && <ErrorMessage message={errorMessage} />}
      {departments.length > 0 ? (
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <div className="card shadow-lg">
                <div className="card-header bg-success text-white text-center">
                  <h2>Departments Details</h2>
                </div>
                <div className="card-body bg-light">
                  <table className="table table-bordered table-hover text-center tableData">
                    <thead>
                      <tr>
                        <th>DEPT-ID</th>
                        <th>DEPT-NAME</th>
                        <th>DEPT-CODE</th>
                        <th>DEPT-DESC</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((department) => {
                        return (
                          <tr key={department.departmentId}>
                            <td>{department.departmentId}</td>
                            <td>{department.departmentName}</td>
                            <td>{department.departmentCode}</td>
                            <td>{department.departmentDescription}</td>
                            <td>
                              <button
                                onClick={() =>
                                  deleteDepartment(department.departmentId)
                                }
                                className="btn btn-danger ms-2"
                              >
                                <i className="bi bi-trash"></i>
                              </button>

                              <Link
                                to={`/update-department/${department.departmentId}`}
                                className="btn btn-info ms-2"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>

                              <Link
                                to={`/view-department/${department.departmentId}`}
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

export default ListDepartments;
