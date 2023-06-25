import { Box, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setCafeIdToDelete, setLocation } from "../cafe/cafeSlice";
import { ALL, EMPLOYEE_ENTITY } from "../constants";
import { setEmployeeIdToDelete } from "../employees/employeeSlice";
import {
  useDeleteCafeMutation,
  useGetCafesByLocationQuery
} from "../services/cafes";
import {
  useDeleteEmployeeMutation,
  useGetEmployeesByCafeQuery
} from "../services/employees";
import ReusableBtn from "./ReusableBtn";
import { mainBoxStyles } from "./deleteModalStyles";

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
        dispatch(setLocation(ALL));
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
    <Modal open={isOpen}>
      <Box sx={mainBoxStyles}>
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
