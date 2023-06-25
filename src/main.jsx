import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./app/store";
import Cafes from "./routes/cafes";

import CafeCreateOrEdit from "./routes/cafeCreateOrEdit";
import EmployeeCreateOrEdit from "./routes/employeeCreateOrEdit";
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
  { path: "employees/new", element: <EmployeeCreateOrEdit /> },
  { path: "employees/:employeeId/edit", element: <EmployeeCreateOrEdit /> },
  { path: "cafes/new", element: <CafeCreateOrEdit /> },
  { path: "cafes/:employeeId/edit", element: <CafeCreateOrEdit /> }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
