import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  employeeIdToDelete: ""
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployeeIdToDelete: (state, action) => {
      state.employeeIdToDelete = action.payload;
    }
  }
});

export const { setEmployees, setEmployeeIdToDelete } = employeesSlice.actions;

export default employeesSlice.reducer;
