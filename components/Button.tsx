import {
  ButtonProps,
  chakra,
  LinkProps,
  Spinner,
  theme,
} from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import React from "react";

const base: Props = {
  bgColor: theme.colors.blue[400],
  padding: theme.space[2],
  color: theme.colors.white,
  maxW: "100%",
  width: "240px",
  display: "inline-block",
  boxShadow: theme.shadows.md,
  cursor: "pointer",
  borderRadius: theme.radii.md,
  tabIndex: 0,
  fontWeight: theme.fontWeights.bold,
};

const hover: Props = {
  _hover: { bgColor: theme.colors.blue[600] },
  _focus: { bgColor: theme.colors.blue[600] },
};

export const LinkButton: React.FC<LinkProps> = (props) => {
  return (
    <chakra.a {...base} {...hover} {...props}>
      <chakra.div textAlign="center">{props.children}</chakra.div>
    </chakra.a>
  );
};

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <chakra.button {...base} {...props}>
      {props.children}
    </chakra.button>
  );
};

export const DisabledButton: React.FC<ButtonProps> = (props) => {
  return (
    <chakra.button
      {...base}
      bgColor={theme.colors.blue[200]}
      {...props}
      disabled={true}
      cursor="not-allowed"
    >
      {props.children}
    </chakra.button>
  );
};

export const LoadingButton: React.FC<ButtonProps> = (props) => {
  return (
    <DisabledButton {...props}>
      <Spinner size="sm" />
      {props.children}
    </DisabledButton>
  );
};
