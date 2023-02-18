import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "startbootstrap-sb-admin/dist/css/styles.css";

import "@fortawesome/fontawesome-free/js/all";
import "bootstrap/dist/js/bootstrap";
import "startbootstrap-sb-admin/dist/js/scripts";

import { RouteName } from "./constants/constants";
import { DashboardPage, ErrorPage, GroupPage, UserPage } from "./pages/pages";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: RouteName.AuthPage,
        index: true,
        element: <UserPage />,
      },
      {
        path: RouteName.DashboardPage,
        element: <DashboardPage />,
      },
      {
        path: RouteName.GroupPage,
        element: <GroupPage />,
      },
      {
        path: RouteName.UserPage,
        element: <UserPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
