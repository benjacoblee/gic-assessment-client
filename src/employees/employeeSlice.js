import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  employeeIdToDelete: "",
  employeeFormValues: {
    name: "",
    email_address: "",
    phone_number: "",
    gender: "",
    cafe: {}
  }
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployeeIdToDelete: (state, action) => {
      state.employeeIdToDelete = action.payload;
    },
    setEmployeeFormValues: (state, action) => {
      state.employeeFormValues = action.payload;
    }
  }
});

export const { setEmployeeIdToDelete, setEmployeeFormValues } =
  employeesSlice.actions;

export default employeesSlice.reducer;
