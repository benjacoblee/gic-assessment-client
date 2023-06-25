import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./app/store";
import Cafes from "./routes/cafes";
import EmployeePage from "./routes/employeePage";
import Employees from "./routes/employees";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  },
  {
    path: "employees",
    element: <Employees />
  },
  {
    path: "cafes",
    element: <Cafes />
  },
  { path: "employees/new", element: <EmployeePage /> },
  { path: "employees/:employeeId/edit", element: <EmployeePage /> }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
