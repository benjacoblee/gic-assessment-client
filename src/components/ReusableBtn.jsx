import { Button } from "@mui/material";
import PropTypes from "prop-types";

const ReusableBtn = ({ btnText, ...props }) => {
  return (
    <Button
      onClick={props.onClick}
      variant={props.variant}
      color={props.color}
      {...props}
    >
      {btnText}
    </Button>
  );
};

ReusableBtn.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string.isRequired,
  color: PropTypes.string,
  btnText: PropTypes.string.isRequired
};

export default ReusableBtn;
