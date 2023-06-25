import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  locationOptions: [],
  cafeIdToDelete: "",
  cafeFormValues: {
    name: "",
    description: "",
    location: ""
  }
};

export const cafeSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setLocationOptions: (state, action) => {
      state.locationOptions = [...action.payload];
    },
    setCafeIdToDelete: (state, action) => {
      state.cafeIdToDelete = action.payload;
    },
    setCafeFormValues: (state, action) => {
      state.cafeFormValues = { ...action.payload };
    }
  }
});

export const {
  setLocation,
  setLocationOptions,
  setCafeIdToDelete,
  setCafeFormValues
} = cafeSlice.actions;

export default cafeSlice.reducer;
