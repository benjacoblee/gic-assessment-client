import { Box, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLocation } from "../cafe/cafeSlice";
import { useGetCafesByLocationQuery } from "../services/cafes";
import ReusableBtn from "./ReusableBtn";

const LocationSelect = () => {
  const dispatch = useDispatch();
  const locationOptions = useSelector((state) => state.cafes.locationOptions);
  const location = useSelector((state) => state.cafes.location);
  const { refetch: refetchCafes } = useGetCafesByLocationQuery(location);
  const navigate = useNavigate();

  const handleLocationChange = async (e) => {
    const newLocation = e.target.value;
    dispatch(setLocation(newLocation));
    await refetchCafes(location);
  };

  return (
    <>
      <Select
        sx={{ width: "50%" }}
        value={location}
        onChange={handleLocationChange}
      >
        {locationOptions.map((location) => {
          return (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          );
        })}
      </Select>
      <Box>
        <ReusableBtn
          onClick={() => navigate(-1)}
          variant="outlined"
          btnText="Go back"
          sx={{ mr: 2 }}
        />
        <ReusableBtn variant="contained" color="info" btnText="Add New Cafe" />
      </Box>
    </>
  );
};

export default LocationSelect;
