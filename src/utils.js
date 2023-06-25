import { ALL } from "./constants";

const mapLocationOptions = (cafesByLocation) => {
  const options = [{ location: ALL }, ...cafesByLocation].map(
    (cafe) => cafe.location
  );

  return options;
};

export { mapLocationOptions };
