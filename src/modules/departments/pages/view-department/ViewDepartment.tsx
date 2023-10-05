import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IDepartment } from "../../models/IDepartment";
import { DepartmentService } from "../../services/DepartmentService";
import NoRecordFound from "../../../organizations/components/NoRecordFound";
import SpinnerUI from "../../../employees/components/SpinnerUI";
import ErrorMessage from "../../../employees/components/ErrorMessage";

interface IState {
  loading: boolean;
  errorMessage: string;
  department: IDepartment;
}

const ViewDepartment: React.FC = () => {
  let { id } = useParams();

  const [state, setState] = useState<IState>({
    loading: false,
    errorMessage: "",
    department: {} as IDepartment,
  });

  const fetchDepartmentById = () => {
    setState({ ...state, loading: true });
    DepartmentService.getDepartmentById(id)
      .then((response: any) => {
        setState({
          ...state,
          loading: false,
          department: response.data,
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
    fetchDepartmentById();
  }, [id]);

  let { loading, errorMessage, department } = state;

  return (
    <>
      {loading && <SpinnerUI />}
      {errorMessage.length > 0 && <ErrorMessage message={errorMessage} />}
      {Object.keys(department).length > 0 ? (
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-5 m-auto">
              <div className="card">
                <div className="card-header bg-info text-center">
                  <h2>Department Data</h2>
                </div>
                <div className="card-body bg-light">
                  <table className="table table-bordered table-hover tableData">
                    <tbody>
                      <tr>
                        <th>DEPT-ID</th>
                        <td>{department.departmentId}</td>
                      </tr>

                      <tr>
                        <th>DEPT-NAME</th>
                        <td>{department.departmentName}</td>
                      </tr>

                      <tr>
                        <th>DEPT-CODE</th>
                        <td>{department.departmentCode}</td>
                      </tr>

                      <tr>
                        <th>DEPT-DESC</th>
                        <td>{department.departmentDescription}</td>
                      </tr>
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

export default ViewDepartment;
