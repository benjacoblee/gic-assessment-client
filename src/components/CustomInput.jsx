import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const CustomInput = (props) => {
  const { id, label, name, placeholder, type, validator, value } = props;

  return (
    <TextField
      id={id}
      label={label}
      name={name}
      placeholder={placeholder}
      type={type}
      error={value && validator?.isError(value) ? true : false}
      helperText={value && validator?.isError(value) ? validator.errorMsg : ""}
      {...props}
    />
  );
};

CustomInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  validator: PropTypes.object,
  value: PropTypes.string
};

export default CustomInput;
