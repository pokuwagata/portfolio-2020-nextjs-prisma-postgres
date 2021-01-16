import { chakra } from "@chakra-ui/react";

const Section: React.FC = (props) => {
  return (
    <chakra.section maxW={1230 - 32 * 2} margin="0 auto">
      {props.children}
    </chakra.section>
  );
};

export default Section;
