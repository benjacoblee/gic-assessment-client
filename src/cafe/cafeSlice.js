import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  locationOptions: [],
  cafeIdToDelete: ""
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
    }
  }
});

export const { setLocation, setLocationOptions, setCafeIdToDelete } =
  cafeSlice.actions;

export default cafeSlice.reducer;
