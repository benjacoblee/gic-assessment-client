import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./app/store";
import Root from "./routes/root";
import Employees from "./routes/employees";
import Cafes from "./routes/cafes";

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
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
