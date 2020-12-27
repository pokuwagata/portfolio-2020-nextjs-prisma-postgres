import { chakra, Spinner } from "@chakra-ui/react";
import React from "react";

const CenterSpinner: React.FC = (props) => {
  return (
    <chakra.div
      pos="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%);"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </chakra.div>
  );
};

export default CenterSpinner;
