import { ButtonProps, chakra, LinkProps, theme } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";

const base: Props = {
  bgColor: theme.colors.blue[400],
  padding: theme.space[3],
  color: theme.colors.white,
  maxW: "100%",
  width: "240px",
  display: "inline-block",
  boxShadow: theme.shadows.md,
  cursor: "pointer",
  borderRadius: theme.radii.md,
  tabIndex: 0,
  fontWeight: theme.fontWeights.bold,
  _hover: { bgColor: theme.colors.blue[600] },
  _focus: { bgColor: theme.colors.blue[600] },
};

export const Button: React.FC<LinkProps> = (props) => {
  return (
    <chakra.a {...base} {...props}>
      <chakra.div textAlign="center">{props.children}</chakra.div>
    </chakra.a>
  );
};

export const PostButton: React.FC<ButtonProps> = (props) => {
  return (
    <chakra.button {...base} {...props}>
      {props.children}
    </chakra.button>
  );
};
