import React, { ChangeEvent, FormEvent, useState } from "react";
import { IDepartment } from "../../models/IDepartment";
import { DepartmentService } from "../../services/DepartmentService";
import { useNavigate } from "react-router-dom";
import { ToastUtil } from "../../../../util/ToastUtil";

const CreateDepartment: React.FC = () => {
  let navigate = useNavigate();

  const [department, setDepartment] = useState<IDepartment>({
    departmentName: "",
    departmentCode: "",
    departmentDescription: "",
  });

  const onInputChange = (event: ChangeEvent<HTMLInputElement | any>) => {
    setDepartment({
      ...department,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement | any>) => {
    event.preventDefault();
    DepartmentService.saveDepartment(department)
      .then((response: any) => {
        if (response) {
          navigate("/departments");
          ToastUtil.displaySuccessToast("Department is Created");
        }
      })
      .catch((error: any) => {
        console.log(error);
        ToastUtil.displayErrorToast(
          "Unable to Save Department into the Server"
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
              <div className="card-header bg-info text-center">
                <h2>Register Department</h2>
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
                      value={"Register"}
                      className="btn btn-info form-control"
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

export default CreateDepartment;
