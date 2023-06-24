import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cafesApi } from "../services/cafes";
import cafeSliceReducer from "../cafe/cafeSlice";
import employeeSliceReducer from "../employees/employeeSlice";
import { employeesApi } from "../services/employees";

export const store = configureStore({
  reducer: {
    [cafesApi.reducerPath]: cafesApi.reducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
    cafes: cafeSliceReducer,
    employees: employeeSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cafesApi.middleware)
      .concat(employeesApi.middleware)
});

setupListeners(store.dispatch);
