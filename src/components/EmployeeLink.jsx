import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EmployeeLink = (props) => (
  <Link to={`/employees?cafe=${props.data._id}`}>{props.value}</Link>
);

EmployeeLink.propTypes = {
  data: PropTypes.object,
  value: PropTypes.number
};

export default EmployeeLink;
