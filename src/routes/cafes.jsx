import { Box, Card, Container } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setCafeIdToDelete,
  setLocation,
  setLocationOptions
} from "../cafe/cafeSlice";
import DeleteModal from "../components/DeleteModal";
import EmployeeLink from "../components/EmployeeLink";
import LocationSelect from "../components/LocationSelect";
import ReusableBtn from "../components/ReusableBtn";
import {
  aggridCardContainer,
  centeredBox,
  locationOptionsBox
} from "../components/styles";
import { ALL, CAFE_ENTITY } from "../constants";
import { useGetCafesByLocationQuery } from "../services/cafes";
import { mapLocationOptions } from "../utils";

const Cafes = () => {
  const dispatch = useDispatch();
  const locationOptions = useSelector((state) => state.cafes.locationOptions);
  const location = useSelector((state) => state.cafes.location);
  const { data: cafesByLocation, isLoading } =
    useGetCafesByLocationQuery(location);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (cafesByLocation) {
      const options = mapLocationOptions(cafesByLocation);
      dispatch(setLocationOptions(Array.from(new Set(options))));
    }
  }, [cafesByLocation, dispatch]);

  useEffect(() => {
    if (!locationOptions.includes(ALL)) {
      dispatch(setLocation(ALL));
    }
  }, [locationOptions, dispatch]);

  const [columnDefs] = useState([
    { field: "_id", headerName: "ID" },
    { field: "name" },
    { field: "description" },
    { field: "location" },
    { field: "employees", cellRenderer: EmployeeLink },
    {
      field: "edit",
      cellRenderer: (params) => (
        <Link to={`/cafes/${params.data._id}/edit`}>
          <ReusableBtn variant="contained" color="info" btnText="Edit" />
        </Link>
      )
    },
    {
      field: "delete",
      cellRenderer: (params) => (
        <ReusableBtn
          onClick={() => {
            setIsOpen(true);
            dispatch(setCafeIdToDelete(params.data._id));
          }}
          variant="contained"
          color="warning"
          btnText="Delete"
        />
      )
    }
  ]);

  return (
    <Container sx={{ height: "100vh" }}>
      <Box sx={centeredBox}>
        <Card sx={aggridCardContainer}>
          <h1>Cafes</h1>
          <DeleteModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            entity={CAFE_ENTITY}
          />
          {!isLoading && locationOptions?.length ? (
            <Box sx={locationOptionsBox}>
              <LocationSelect />
            </Box>
          ) : null}
          {!isLoading && cafesByLocation?.length ? (
            <Box
              className="ag-theme-alpine"
              sx={{ height: 400, width: "100%" }}
            >
              <AgGridReact rowData={cafesByLocation} columnDefs={columnDefs} />
            </Box>
          ) : null}
        </Card>
      </Box>
    </Container>
  );
};

export default Cafes;
