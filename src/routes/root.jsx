import { Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import ReusableBtn from "../components/ReusableBtn";
import { centeredBox } from "../components/styles";
import "../global.css";

export default function Root() {
  return (
    <>
      <Container sx={{ height: "100vh" }}>
        <Box sx={centeredBox}>
          <Box component="h1">Cafe Employees</Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ mr: 2 }}>
              <Link to={"/cafes"}>
                <ReusableBtn variant="contained" color="info" btnText="Cafes" />
              </Link>
            </Box>
            <Box>
              <Link to={"/employees"}>
                <ReusableBtn
                  variant="outlined"
                  color="info"
                  btnText="Employees"
                />
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
