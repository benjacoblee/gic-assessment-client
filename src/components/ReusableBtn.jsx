import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";

const ReusableBtn = (props) => {
  return (
    <Box>
      <Button
        onClick={props.onClick}
        variant={props.variant}
        color={props.color}
        {...props}
      >
        {props.btnText}
      </Button>
    </Box>
  );
};

ReusableBtn.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired
};

export default ReusableBtn;
