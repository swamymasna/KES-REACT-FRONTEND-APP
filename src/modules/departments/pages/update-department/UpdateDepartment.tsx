import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IDepartment } from "../../models/IDepartment";
import { DepartmentService } from "../../services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";
import { ToastUtil } from "../../../../util/ToastUtil";

const UpdateDepartment: React.FC = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  const [department, setDepartment] = useState<IDepartment>({
    departmentName: "",
    departmentCode: "",
    departmentDescription: "",
  });

  const fetchDepartmentById = () => {
    DepartmentService.getDepartmentById(id)
      .then((response: any) => {
        setDepartment({
          ...department,
          departmentName: response.data.departmentName,
          departmentCode: response.data.departmentCode,
          departmentDescription: response.data.departmentDescription,
        });
      })
      .catch();
  };

  useEffect(() => {
    fetchDepartmentById();
  }, [id]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement | any>) => {
    setDepartment({
      ...department,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement | any>) => {
    event.preventDefault();
    DepartmentService.updateDepartment(id, department)
      .then((response: any) => {
        if (response) {
          navigate("/departments");
          ToastUtil.displaySuccessToast("Department is Updated");
        }
      })
      .catch((error: any) => {
        console.log(error);
        ToastUtil.displayErrorToast(
          "Unable to Update Department into the Server"
        );
      });
  };

  const { departmentName, departmentCode, departmentDescription } = department;

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5 m-auto">
            <div className="card shadow-lg">
              <div className="card-header bg-success text-white text-center">
                <h2>Update Department</h2>
              </div>
              <div className="card-body bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={departmentName}
                      name="departmentName"
                      onChange={onInputChange}
                      placeholder="Enter Department Name"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      value={departmentCode}
                      name="departmentCode"
                      onChange={onInputChange}
                      placeholder="Enter Department Code"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      value={departmentDescription}
                      name="departmentDescription"
                      onChange={onInputChange}
                      placeholder="Enter Department Description"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="submit"
                      value={"Update"}
                      className="btn btn-success form-control"
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

export default UpdateDepartment;
