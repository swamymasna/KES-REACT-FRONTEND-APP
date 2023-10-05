import React from "react";
import "./App.css";
import ToastContainerUI from "./modules/organizations/components/ToastContainerUI";
import { Routes, Route } from "react-router-dom";
import ListOrganizations from "./modules/organizations/pages/list-organizations/ListOrganizations";
import CreateOrganization from "./modules/organizations/pages/create-organization/CreateOrganization";
import UpdateOrganization from "./modules/organizations/pages/update-organization/UpdateOrganization";
import ViewOrganization from "./modules/organizations/pages/view-organization/ViewOrganization";
import NotFound404 from "./modules/organizations/components/NotFound404";
import NavBar from "./layout/NavBar";
import ListDepartments from "./modules/departments/pages/list-departments/ListDepartments";
import CreateDepartment from "./modules/departments/pages/create-department/CreateDepartment";
import UpdateDepartment from "./modules/departments/pages/update-department/UpdateDepartment";
import ViewDepartment from "./modules/departments/pages/view-department/ViewDepartment";
import ListEmployees from "./modules/employees/pages/list-employees/ListEmployees";
import CreateEmployee from "./modules/employees/pages/create-employee/CreateEmployee";
import UpdateEmployee from "./modules/employees/pages/update-employee/UpdateEmployee";
import ViewEmployee from "./modules/employees/pages/view-employee/ViewEmployee";

function App() {
  return (
    <div className="app">
      <NavBar/>
      <ToastContainerUI />

      <Routes>
        <Route path="/organizations" element={<ListOrganizations />} />
        <Route path="/create-organization" element={<CreateOrganization />} />
        <Route
          path="/update-organization/:id"
          element={<UpdateOrganization />}
        />
        <Route path="/view-organization/:id" element={<ViewOrganization />} />
        <Route path="/*" element={<NotFound404 />} />

        <Route path="/departments" element={<ListDepartments />} />
        <Route path="/create-department" element={<CreateDepartment />} />
        <Route path="/update-department/:id" element={<UpdateDepartment />} />
        <Route path="/view-department/:id" element={<ViewDepartment />} />

        <Route path="/" element={<ListEmployees />} />
        <Route path="/employees" element={<ListEmployees />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/update-employee/:id" element={<UpdateEmployee />} />
        <Route path="/view-employee/:id" element={<ViewEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
