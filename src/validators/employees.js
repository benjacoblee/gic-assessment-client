import validator from "validator";
import {
  EMPLOYEE_PHONE_NO_MIN_LENGTH,
  MAXIMUM_NAME_LENGTH,
  MINIMUM_NAME_LENGTH,
  VALID_STARTING_PHONE_NUMBERS
} from "../constants";

const validateEmployeeName = {
  isError: (name) => {
    return (
      name.length < MINIMUM_NAME_LENGTH || name.length > MAXIMUM_NAME_LENGTH
    );
  },
  errorMsg: "Name must be a minimum of 6 chars and maximum of 10 chars"
};

const validateEmployeeEmail = {
  isError: (email) => !validator.isEmail(email),
  errorMsg: "Must be type email"
};

const validateEmployeePhoneNumber = {
  isError: (phoneNumber) => {
    const firstChar = phoneNumber[0];
    return !(
      VALID_STARTING_PHONE_NUMBERS.includes(firstChar) &&
      phoneNumber.length === EMPLOYEE_PHONE_NO_MIN_LENGTH
    );
  },
  errorMsg: "Needs to be 8 digits and start with 8 or 9"
};

export {
  validateEmployeeName,
  validateEmployeeEmail,
  validateEmployeePhoneNumber
};
