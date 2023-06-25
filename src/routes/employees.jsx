import { Box, Card, Container } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import ReusableBtn from "../components/ReusableBtn";
import { aggridCardContainer, centeredBox } from "../components/styles";
import { EMPLOYEE_ENTITY } from "../constants";
import { setEmployeeIdToDelete } from "../employees/employeeSlice";
import { useGetEmployeesByCafeQuery } from "../services/employees";

const Employees = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const cafe = searchParams.get("cafe") || "";
  const { data: employeesByCafe, isLoading } = useGetEmployeesByCafeQuery(cafe);
  const navigate = useNavigate();
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
        <Link to={`/employees/${params.data._id}/edit/`}>
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
      <Box sx={centeredBox}>
        <Card sx={aggridCardContainer}>
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
              <ReusableBtn
                onClick={() => navigate(-1)}
                variant="outlined"
                color="info"
                btnText="Go Back"
                sx={{ mr: 2 }}
              />
              <Link to={`/employees/new`}>
                <ReusableBtn
                  variant="contained"
                  color="info"
                  btnText="Add New Employee"
                />
              </Link>
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
