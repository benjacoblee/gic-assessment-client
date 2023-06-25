import { MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ALL } from "../constants";
import { setEmployeeFormValues } from "../employees/employeeSlice";
import { useGetCafesByLocationQuery } from "../services/cafes";
import { customInputStyles } from "./styles";

const CafeSelect = () => {
  const dispatch = useDispatch();
  const employeeFormValues = useSelector(
    (state) => state.employees.employeeFormValues
  );
  const { data: cafesByLocation } = useGetCafesByLocationQuery(ALL);

  return (
    <Select
      name="cafe"
      sx={customInputStyles}
      value={employeeFormValues.cafe?.name || ""}
    >
      {cafesByLocation?.map((cafe) => {
        return (
          <MenuItem
            onClick={() =>
              dispatch(setEmployeeFormValues({ ...employeeFormValues, cafe }))
            }
            key={cafe._id}
            value={cafe.name}
          >
            {cafe.name}
          </MenuItem>
        );
      })}
    </Select>
  );
};

CafeSelect.propTypes = {
  handleInputChange: PropTypes.func
};

export default CafeSelect;
