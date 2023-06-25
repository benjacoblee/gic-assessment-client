import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ALL, POST, PUT, VALID_GENDERS } from "../constants";
import { setEmployeeFormValues } from "../employees/employeeSlice";
import {
  useCreateOrEditEmployeeMutation,
  useGetEmployeesByCafeQuery
} from "../services/employees";
import {
  validateEmployeeEmail,
  validateEmployeeName,
  validateEmployeePhoneNumber
} from "../validators/employees";
import { Container, Box, ButtonGroup } from "@mui/material";
import { centeredBox, customInputStyles } from "../components/styles";
import CustomInput from "../components/CustomInput";
import CafeSelect from "../components/CafeSelect";
import ReusableBtn from "../components/ReusableBtn";
import { useGetCafesByLocationQuery } from "../services/cafes";

const EmployeeCreateOrEdit = () => {
  const dispatch = useDispatch();
  const employeeFormValues = useSelector(
    (state) => state.employees.employeeFormValues
  );
  const { employeeId } = useParams();
  const { data: employees, isLoading: isEmployeesLoading } =
    useGetEmployeesByCafeQuery("");
  const { refetch: refetchCafes } = useGetCafesByLocationQuery(ALL);
  const [createOrEditEmployee] = useCreateOrEditEmployeeMutation({});
  const navigate = useNavigate();

  const { _id, name, email_address, phone_number, gender } = employeeFormValues;
  const [MALE, FEMALE] = VALID_GENDERS;

  useEffect(() => {
    if (!isEmployeesLoading) {
      if (employeeId) {
        const employeeData = employees.find(
          (employee) => employee._id === employeeId
        );
        dispatch(
          setEmployeeFormValues({
            _id: employeeId,
            ...employeeData
          })
        );
      } else {
        dispatch(setEmployeeFormValues({}));
      }
    }
  }, [dispatch, employeeId, employees, isEmployeesLoading]);

  const handleInputChange = (e) => {
    dispatch(
      setEmployeeFormValues({
        ...employeeFormValues,
        [e.target.name]: e.target.value
      })
    );
  };

  const checkRequiredFields = () => {
    return !name || !email_address || !phone_number || !gender;
  };

  const checkFormErrors = () => {
    const areRequiredFieldsEmpty = checkRequiredFields();
    if (!areRequiredFieldsEmpty) {
      return (
        validateEmployeeName.isError(name) ||
        validateEmployeeEmail.isError(email_address) ||
        validateEmployeePhoneNumber.isError(phone_number)
      );
    }
    return areRequiredFieldsEmpty;
  };

  const isFormInvalid = () => checkFormErrors();

  const handleFormSubmit = async () => {
    const method = employeeId ? PUT : POST;

    createOrEditEmployee({
      data: {
        _id,
        cafe_id: employeeFormValues.cafe?._id,
        name,
        email_address,
        phone_number,
        gender
      },
      method
    });

    await refetchCafes(ALL);

    navigate("/employees");
  };

  return (
    <Container sx={{ height: "100vh" }}>
      {!isEmployeesLoading && (
        <Box sx={centeredBox}>
          <h1>{employeeId ? "Edit" : "Add"} Employee</h1>
          <CustomInput
            id="name"
            label="Employee Name"
            onChange={handleInputChange}
            name="name"
            type="text"
            placeholder="Employee Name"
            value={employeeFormValues.name || ""}
            sx={customInputStyles}
            validator={validateEmployeeName}
          />
          <CustomInput
            id="email-address"
            label="Email Address"
            onChange={handleInputChange}
            name="email_address"
            type="email"
            placeholder="Employee Email"
            value={employeeFormValues.email_address || ""}
            sx={customInputStyles}
            validator={validateEmployeeEmail}
          />
          <CustomInput
            id="phone-number"
            label="Phone Number"
            onChange={handleInputChange}
            name="phone_number"
            type="string"
            placeholder="Phone Number"
            value={employeeFormValues.phone_number || ""}
            sx={customInputStyles}
            validator={validateEmployeePhoneNumber}
          />
          <ButtonGroup sx={{ ...customInputStyles, justifyContent: "center" }}>
            <ReusableBtn
              variant={
                employeeFormValues.gender === MALE ? "contained" : "outlined"
              }
              name="gender"
              value="Male"
              onClick={handleInputChange}
              btnText="Male"
            />
            <ReusableBtn
              variant={
                employeeFormValues.gender === FEMALE ? "contained" : "outlined"
              }
              name="gender"
              value="Female"
              onClick={handleInputChange}
              btnText="Female"
            />
          </ButtonGroup>
          <CafeSelect customInputStyles={customInputStyles} />
          <Box>
            <Link to="/employees">
              <ReusableBtn
                sx={{ display: "inline-block", mr: 2 }}
                variant="contained"
                color="warning"
                btnText="cancel"
              >
                Cancel
              </ReusableBtn>
            </Link>
            <ReusableBtn
              onClick={handleFormSubmit}
              sx={{ display: "inline-block" }}
              variant="contained"
              color="info"
              btnText="Submit"
              disabled={isFormInvalid()}
            >
              Submit
            </ReusableBtn>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default EmployeeCreateOrEdit;
