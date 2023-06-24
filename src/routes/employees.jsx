import { Box, Button, Card, Container } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ReusableBtn from "../components/ReusableBtn";
import DeleteModal from "../components/DeleteModal";
import { setEmployeeIdToDelete } from "../employees/employeeSlice";
import { useGetEmployeesByCafeQuery } from "../services/employees";
import { EMPLOYEE_ENTITY } from "../constants";

const Employees = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const cafe = searchParams.get("cafe") || "";
  const { data: employeesByCafe, isLoading } = useGetEmployeesByCafeQuery(cafe);

  const [isOpen, setIsOpen] = useState(false);

  const [columnDefs] = useState([
    { field: "_id", headerName: "ID" },
    { field: "name" },
    { field: "email_address", headerName: "Email Address" },
    { field: "phone_number", headerName: "Phone Number" },
    { field: "gender" },
    { field: "cafe.name" },
    { field: "start_date", headerName: "Start Date" },
    { field: "days_worked", headerName: "Days Worked" },
    {
      field: "edit",
      cellRenderer: (params) => (
        <ReusableBtn variant="contained" color="info" btnText="Edit" />
      )
    },
    {
      field: "delete",
      cellRenderer: (params) => (
        <ReusableBtn
          onClick={() => {
            setIsOpen(true);
            dispatch(setEmployeeIdToDelete(params.data._id));
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <Card
          sx={{
            width: "100%",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h1>Employees</h1>
          <Box
            sx={{
              width: "100%",
              marginBottom: 4,
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <Box>
              <Button sx={{ height: "100%" }} variant="contained" color="info">
                Add New Employee
              </Button>
            </Box>
          </Box>
          <DeleteModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            entity={EMPLOYEE_ENTITY}
          />

          {!isLoading && employeesByCafe?.length ? (
            <Box
              className="ag-theme-alpine"
              sx={{ height: 400, width: "100%" }}
            >
              <AgGridReact rowData={employeesByCafe} columnDefs={columnDefs} />
            </Box>
          ) : null}
        </Card>
      </Box>
    </Container>
  );
};

export default Employees;
