import { Box, Button, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../cafe/cafeSlice";
import { useGetCafesByLocationQuery } from "../services/cafes";

const LocationSelect = () => {
  const dispatch = useDispatch();
  const locationOptions = useSelector((state) => state.cafes.locationOptions);
  const location = useSelector((state) => state.cafes.location);
  const { refetch: refetchCafes } = useGetCafesByLocationQuery(location);

  const handleLocationChange = async (e) => {
    const newLocation = e.target.value;

    new Promise((resolve) => {
      dispatch(setLocation(newLocation));
      resolve();
    }).then(async () => {
      await refetchCafes(location);
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: 4,
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <Select
        sx={{ width: "50%", marginRight: 2 }}
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
        <Button sx={{ height: "100%" }} variant="contained" color="info">
          Add New Cafe
        </Button>
      </Box>
    </Box>
  );
};

export default LocationSelect;
