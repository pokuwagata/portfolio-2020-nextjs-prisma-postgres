import { chakra, theme } from "@chakra-ui/react";

const CheckBox: React.FC<any> = (props) => {
  return (
    <chakra.input
      type="checkbox"
      tabIndex={0}
      _focus={{ outline: "1px auto " + theme.colors.blue[400] }}
      {...props}
    />
  );
};

export default CheckBox;
