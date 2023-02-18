import React from "react";
import { Link } from "react-router-dom";
import { RouteName } from "../../constants/constants";

const Sidebar = () => {
  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Core</div>
          <Link className="nav-link" to={RouteName.DashboardPage}>
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            Dashboard
          </Link>
          <div className="sb-sidenav-menu-heading">Administrator</div>
          <a
            className="nav-link collapsed"
            href="#"
            data-bs-toggle="collapse"
            data-bs-target="#collapseLayouts"
            aria-expanded="false"
            aria-controls="collapseLayouts"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-columns"></i>
            </div>
            Settings
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down"></i>
            </div>
          </a>
          <div
            className="collapse"
            id="collapseLayouts"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              <Link className="nav-link" to={RouteName.GroupPage}>
                Master Grup
              </Link>
              <Link className="nav-link" to={RouteName.UserPage}>
                Master User
              </Link>
            </nav>
          </div>
        </div>
      </div>
      {/* <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        Start Bootstrap
      </div> */}
    </nav>
  );
};

export default Sidebar;
