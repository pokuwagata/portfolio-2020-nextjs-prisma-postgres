import { BoxProps, chakra, theme } from "@chakra-ui/react";

const Heading: React.FC<BoxProps> = (props) => {
  return (
    <chakra.h2
      fontSize={[theme.fontSizes["xl"], theme.fontSizes["2xl"]]}
      {...props}
    >
      {props.children}
    </chakra.h2>
  );
};

export default Heading;
