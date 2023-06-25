import { Box, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLocation } from "../cafe/cafeSlice";
import { useGetCafesByLocationQuery } from "../services/cafes";
import ReusableBtn from "./ReusableBtn";

const LocationSelect = () => {
  const dispatch = useDispatch();
  const locationOptions = useSelector((state) => state.cafes.locationOptions);
  const location = useSelector((state) => state.cafes.location);
  const { refetch: refetchCafes } = useGetCafesByLocationQuery(location);

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
        <Link to="/">
          <ReusableBtn variant="outlined" btnText="Home" sx={{ mr: 2 }} />
        </Link>
        <Link to="/cafes/new">
          <ReusableBtn
            variant="contained"
            color="info"
            btnText="Add New Cafe"
          />
        </Link>
      </Box>
    </>
  );
};

export default LocationSelect;
