import React, { useEffect, useState } from "react";
import { IOrganization } from "../../models/IOrganization";
import { useParams } from "react-router-dom";
import { OrganizationService } from "../../services/OrganizationService";
import { Link } from "react-router-dom";
import NoRecordFound from "../../components/NoRecordFound";
import SpinnerUI from "../../../employees/components/SpinnerUI";
import ErrorMessage from "../../../employees/components/ErrorMessage";

interface IState {
  loading: boolean;
  errorMessage: string;
  organization: IOrganization;
}

const ViewOrganization: React.FC = () => {
  const { id } = useParams();

  const [state, setState] = useState<IState>({
    loading: false,
    errorMessage: "",
    organization: {} as IOrganization,
  });

  const fetchOrganizationById = () => {
    setState({ ...state, loading: true });
    OrganizationService.getOrganizationById(id)
      .then((response: any) => {
        setState({
          ...state,
          loading: false,
          organization: response.data,
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
    fetchOrganizationById();
  }, [id]);

  let { loading, errorMessage, organization } = state;

  return (
    <>
      {loading && <SpinnerUI />}
      {errorMessage.length > 0 && <ErrorMessage message={errorMessage} />}
      {Object.keys(organization).length > 0 ? (
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-5 m-auto">
              <div className="card shadow-lg">
                <div className="card-header bg-danger text-white text-center">
                  <h2>Organization Data</h2>
                </div>
                <div className="card-body bg-light">
                  <table className="table table-bordered table-hover tableData">
                    <tbody>
                      <tr>
                        <th>ORG-ID</th>
                        <td>{organization.organizationId}</td>
                      </tr>

                      <tr>
                        <th>ORG-NAME</th>
                        <td>{organization.organizationName}</td>
                      </tr>

                      <tr>
                        <th>ORG-CODE</th>
                        <td>{organization.organizationCode}</td>
                      </tr>

                      <tr>
                        <th>ORG-DESC</th>
                        <td>{organization.organizationDescription}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Link to={"/"} className="btn btn-primary">
                    <i className="bi bi-arrow-left-square"></i> Go Back
                  </Link>
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

export default ViewOrganization;
