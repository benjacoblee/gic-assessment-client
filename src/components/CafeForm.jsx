import { Box, Container } from "@mui/material";
import { centeredBox } from "./styles";

const CafeForm = () => {
  return (
    <Container sx={{ height: "100vh" }}>
      <Box sx={centeredBox}>Cafe Form</Box>
    </Container>
  );
};

export default CafeForm;
