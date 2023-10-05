import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const NavBar: React.FC = () => {
  return (
    <div>
      <nav className="navbar bg-dark navbar-expand-lg">
        <div className="container">
          <Link to={"/"} className="navbar-brand text-white">
            <span className="navBrand">KES Application</span>
          </Link>
          <div className="navbar-collapse">
            <ul className="navbar-nav navData">

              {/* drop down for employees */}
            <li className="nav-item dropdown">
                <Link
                  to={""}
                  className="nav-link dropdown-toggle text-white"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="text-white">
                  Employees 
                  </span>
                </Link>
                <ul className="dropdown-menu ">
                  <li>
                    <Link to={"/create-employee"} className="nav-link">
                      Add-Employee
                    </Link>
                  </li>
                  <li>
                    <Link to={"/employees"} className="nav-link">
                      View-Employees
                    </Link>
                  </li>
                </ul>
              </li>
              {/*ending : drop down for employees */}

            {/* drop down for departments */}
            <li className="nav-item dropdown">
                <Link
                  to={""}
                  className="nav-link dropdown-toggle text-white"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="text-white">
                  Departments
                  </span>
                </Link>
                <ul className="dropdown-menu ">
                  <li>
                    <Link to={"/create-department"} className="nav-link">
                      Add-Department
                    </Link>
                  </li>
                  <li>
                    <Link to={"/departments"} className="nav-link">
                      View-Departments
                    </Link>
                  </li>
                </ul>
              </li>
              {/*ending : drop down for departments */}

              {/* drop down for organizations */}
              <li className="nav-item dropdown">
                <Link
                  to={""}
                  className="nav-link dropdown-toggle text-white"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="text-white">
                    Organizations 
                  </span>
                </Link>
                <ul className="dropdown-menu ">
                  <li>
                    <Link to={"/create-organization"} className="nav-link">
                      Add-Organization
                    </Link>
                  </li>
                  <li>
                    <Link to={"/organizations"} className="nav-link">
                      View-Organizations
                    </Link>
                  </li>
                </ul>
              </li>
              {/*ending : drop down for organizations */}
            </ul>
          </div>
        </div>
      </nav>
      <Footer />
    </div>
  );
};

export default NavBar;
