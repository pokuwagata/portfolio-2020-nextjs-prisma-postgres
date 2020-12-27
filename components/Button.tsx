import { chakra, LinkProps, theme } from "@chakra-ui/react";

const Button: React.FC<LinkProps> = (props) => {
  return (
    <chakra.a
      bgColor={theme.colors.blue[400]}
      padding={theme.space[3]}
      color={theme.colors.white}
      maxW="100%"
      width="240px"
      display="inline-block"
      textAlign="center"
      boxShadow={theme.shadows.md}
      cursor="pointer"
      borderRadius={theme.radii.md}
      tabIndex={0}
      _hover={{ bgColor: theme.colors.blue[600] }}
      _focus={{ bgColor: theme.colors.blue[600] }}
      {...props}
    >
      {props.children}
    </chakra.a>
  );
};

export default Button;
