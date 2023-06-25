import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCafeFormValues } from "../cafe/cafeSlice";
import CustomInput from "../components/CustomInput";
import ReusableBtn from "../components/ReusableBtn";
import { centeredBox, customInputStyles } from "../components/styles";
import { ALL, POST, PUT } from "../constants";
import {
  useCreateOrEditCafeMutation,
  useGetCafesByLocationQuery
} from "../services/cafes";
import {
  validateCafeDescription,
  validateCafeLocation,
  validateCafeName
} from "../validators/cafes";

const CafeForm = () => {
  const dispatch = useDispatch();
  const cafeFormValues = useSelector((state) => state.cafes.cafeFormValues);
  const { cafeId } = useParams();
  const {
    data: cafes,
    refetch: refetchCafes,
    isLoading: isCafesLoading
  } = useGetCafesByLocationQuery(ALL);
  const [createOrEditCafe] = useCreateOrEditCafeMutation({});
  const navigate = useNavigate();

  const { _id, name, description, location } = cafeFormValues;

  useEffect(() => {
    if (!isCafesLoading) {
      if (cafeId) {
        const cafeData = cafes.find((cafe) => cafe._id === cafeId);
        dispatch(
          setCafeFormValues({
            _id: cafeId,
            ...cafeData
          })
        );
      } else {
        dispatch(setCafeFormValues({}));
      }
    }
  }, [dispatch, cafeId, cafes, isCafesLoading]);

  const handleInputChange = (e) => {
    dispatch(
      setCafeFormValues({
        ...cafeFormValues,
        [e.target.name]: e.target.value
      })
    );
  };

  const checkRequiredFields = () => !name || !location;

  const checkFormErrors = () => {
    const areRequiredFieldsEmpty = checkRequiredFields();

    if (!areRequiredFieldsEmpty) {
      return (
        validateCafeName.isError(name) ||
        validateCafeDescription.isError(description) ||
        validateCafeLocation.isError(location)
      );
    }

    return areRequiredFieldsEmpty;
  };

  const isFormInvalid = checkFormErrors();

  const handleFormSubmit = async () => {
    const method = cafeId ? PUT : POST;

    await createOrEditCafe({
      data: {
        _id,
        name,
        description,
        location
      },
      method
    });

    refetchCafes(ALL);

    navigate("/cafes");
  };

  return (
    <Container sx={{ height: "100vh" }}>
      {!isCafesLoading && (
        <Box sx={centeredBox}>
          <h1>{cafeId ? "Edit" : "Add"} Cafe</h1>
          <CustomInput
            id="name"
            label="Cafe Name"
            onChange={handleInputChange}
            name="name"
            type="text"
            placeholder="Cafe Name"
            value={cafeFormValues.name || ""}
            sx={customInputStyles}
            validator={validateCafeName}
          />
          <CustomInput
            id="description"
            label="Cafe Description"
            onChange={handleInputChange}
            name="description"
            type="text"
            placeholder="Cafe Description"
            value={cafeFormValues.description || ""}
            sx={customInputStyles}
            validator={validateCafeDescription}
          />
          <CustomInput
            id="location"
            label="Cafe Location"
            onChange={handleInputChange}
            name="location"
            type="text"
            placeholder="Cafe Location"
            value={cafeFormValues.location || ""}
            sx={customInputStyles}
            validator={validateCafeLocation}
          />{" "}
          <ReusableBtn
            onClick={handleFormSubmit}
            sx={{ display: "inline-block" }}
            variant="contained"
            color="info"
            btnText="Submit"
            disabled={isFormInvalid}
          />
        </Box>
      )}
    </Container>
  );
};

export default CafeForm;
