import {
  MINIMUM_NAME_LENGTH,
  MAXIMUM_NAME_LENGTH,
  MAXIMUM_DESCRIPTION_LENGTH
} from "../constants";

const validateCafeName = {
  isError: (name) => {
    return (
      name.length < MINIMUM_NAME_LENGTH || name.length > MAXIMUM_NAME_LENGTH
    );
  },
  errorMsg: "Name must be a minimum of 6 chars and maximum of 10 chars"
};

const validateCafeDescription = {
  isError: (description) => {
    if (description) {
      return description.length > MAXIMUM_DESCRIPTION_LENGTH;
    }
    return false;
  },
  errorMsg: "Description cannot be more than 256 chars"
};

const validateCafeLocation = {
  isError: (location) => !location,
  errorMsg: "Location cannot be empty"
};

export { validateCafeName, validateCafeDescription, validateCafeLocation };
