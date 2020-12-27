import { chakra, theme } from "@chakra-ui/react";

const FieldErrorMessage: React.FC = (props) => {
  return (
    <chakra.p color={theme.colors.red[600]} mb={theme.space[2]}>
      {props.children}
    </chakra.p>
  );
};

export default FieldErrorMessage;
