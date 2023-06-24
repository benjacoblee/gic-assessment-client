import { Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import "../global.css";

export default function Root() {
  return (
    <>
      <Container sx={{ height: "100vh" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Box>
            <h1>
              <Link to={"cafes"}>Cafes</Link>
            </h1>
          </Box>
          <Box>
            <h1>
              <Link to={"employees"}>Employees</Link>
            </h1>
          </Box>
        </Box>
      </Container>
    </>
  );
}
