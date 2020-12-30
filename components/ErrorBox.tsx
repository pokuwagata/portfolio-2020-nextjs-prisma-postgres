import { WarningIcon } from "@chakra-ui/icons";
import { chakra, theme } from "@chakra-ui/react";
import React from "react";

type Props = {
  title?: string;
  message: string;
};

const ErrorBox: React.FC<Props> = (props) => {
  return (
    <>
      <chakra.div bgColor={theme.colors.red[100]} p={theme.space[4]}>
        <chakra.div display="flex" alignItems="center" mb={theme.space[4]}>
          <WarningIcon
            fontSize={theme.fontSizes.lg}
            color={theme.colors.red[500]}
            verticalAlign="middle"
            mr={theme.space[2]}
          />
          <chakra.h2 fontWeight={theme.fontWeights.bold}>
            {props.title ?? "エラーが発生しました"}
          </chakra.h2>
        </chakra.div>
        <p>{props.message}</p>
      </chakra.div>
    </>
  );
};

export default ErrorBox;
