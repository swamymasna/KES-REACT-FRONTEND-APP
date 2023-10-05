import React, { useEffect, useState } from "react";
import { IOrganization } from "../../models/IOrganization";
import { OrganizationService } from "../../services/OrganizationService";
import noRecordsFoundImg from "../../../../assets/img/noRecordFound.jpg";
import NoRecordFound from "../../components/NoRecordFound";
import { Link, useNavigate } from "react-router-dom";
import { ToastUtil } from "../../../../util/ToastUtil";
import SpinnerUI from "../../../employees/components/SpinnerUI";
import ErrorMessage from "../../../employees/components/ErrorMessage";

interface IState {
  loading: boolean;
  errorMessage: string;
  organizations: IOrganization[];
}

const ListOrganizations: React.FC = () => {
  let navigate = useNavigate();

  const [state, setState] = useState<IState>({
    loading: false,
    errorMessage: "",
    organizations: [] as IOrganization[],
  });

  const fetchAllOrganizations = () => {
    setState({ ...state, loading: true });
    OrganizationService.getAllOrganizations()
      .then((response: any) => {
        setState({
          ...state,
          loading: false,
          organizations: response.data,
        });
      })
      .catch((error: any) => {
        console.log(error.message);
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      });
  };

  useEffect(() => {
    fetchAllOrganizations();
  }, []);

  const deleteOrganization = (id: any) => {
    OrganizationService.deleteOrganization(id)
      .then((response: any) => {
        if (response) {
          fetchAllOrganizations();
          ToastUtil.displaySuccessToast("Organization is Deleted");
        }
      })
      .catch((error: any) => {
        ToastUtil.displayErrorToast(
          "Unable to Delete Organization from the Server"
        );
      });
  };

  let { loading, errorMessage, organizations } = state;

  return (
    <>
      {loading && <SpinnerUI />}
      {errorMessage.length > 0 && <ErrorMessage message={errorMessage} />}
      {organizations.length > 0 ? (
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <div className="card shadow-lg">
                <div className="card-header text-center bg-primary text-white">
                  <h2>Organizations Details</h2>
                </div>
                <div className="card-body bg-light">
                  <table className="table table-bordered table-hover text-center tableData">
                    <thead>
                      <tr>
                        <th>ORG-ID</th>
                        <th>ORG-NAME</th>
                        <th>ORG-CODE</th>
                        <th>ORG-DESC</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {organizations.map((organization) => {
                        return (
                          <tr key={organization.organizationId}>
                            <td>{organization.organizationId}</td>
                            <td>{organization.organizationName}</td>
                            <td>{organization.organizationCode}</td>
                            <td>{organization.organizationDescription}</td>
                            <td>
                              <button
                                onClick={() =>
                                  deleteOrganization(
                                    organization.organizationId
                                  )
                                }
                                className="btn btn-danger ms-2"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                              <Link
                                to={`/update-organization/${organization.organizationId}`}
                                className="btn btn-info ms-2"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                              <Link
                                to={`/view-organization/${organization.organizationId}`}
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

export default ListOrganizations;
