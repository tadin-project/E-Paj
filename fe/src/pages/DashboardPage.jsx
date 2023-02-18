import React from "react";
import { AdminT } from "../templates/templates";

const DashboardPage = () => {
  const title = "Dashboard";
  return (
    <AdminT title={title}>
      <h1 className="mt-4" id="titlePage">
        {title}
      </h1>
    </AdminT>
  );
};

export default DashboardPage;
