import { Box, Button, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setLocation, setCafeIdToDelete } from "../cafe/cafeSlice";
import { setEmployeeIdToDelete } from "../employees/employeeSlice";
import {
  useGetCafesByLocationQuery,
  useDeleteCafeMutation
} from "../services/cafes";
import {
  useGetEmployeesByCafeQuery,
  useDeleteEmployeeMutation
} from "../services/employees";
import ReusableBtn from "./ReusableBtn";
import { EMPLOYEE_ENTITY } from "../constants";

const DeleteModal = ({ isOpen, setIsOpen, entity }) => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.cafes.location);
  let [searchParams] = useSearchParams();
  const cafe = searchParams.get("cafe") || "";
  const { refetch: refetchEmployees } = useGetEmployeesByCafeQuery(cafe);
  const { refetch: refetchCafes } = useGetCafesByLocationQuery(location);
  const [deleteCafe] = useDeleteCafeMutation({});
  const [deleteEmployee] = useDeleteEmployeeMutation({});

  const cafeIdToDelete = useSelector((state) => state.cafes.cafeIdToDelete);
  const employeeIdToDelete = useSelector(
    (state) => state.employees.employeeIdToDelete
  );

  const handleDeleteCafe = async () => {
    await deleteCafe(cafeIdToDelete)
      .then(() => {
        dispatch(setLocation("All"));
      })
      .then(() => {
        refetchCafes();
        refetchEmployees();
        setIsOpen(false);
      });
  };

  const handleDeleteEmployee = async () => {
    await deleteEmployee(employeeIdToDelete).then(async () => {
      refetchEmployees();
      refetchCafes();
      setIsOpen(false);
    });
  };

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete {entity}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          Are you sure?
        </Typography>
        <Box sx={{ display: "flex" }}>
          {" "}
          <ReusableBtn
            variant="outlined"
            color="warning"
            btnText="Cancel"
            sx={{ mr: 2 }}
            onClick={() => {
              if (entity === EMPLOYEE_ENTITY) {
                setEmployeeIdToDelete("");
              } else {
                setCafeIdToDelete("");
              }
              setIsOpen(false);
            }}
          />
          <ReusableBtn
            variant="contained"
            color="warning"
            btnText="Delete"
            onClick={
              entity === EMPLOYEE_ENTITY
                ? handleDeleteEmployee
                : handleDeleteCafe
            }
          />
        </Box>
      </Box>
    </Modal>
  );
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  entity: PropTypes.string
};

export default DeleteModal;
