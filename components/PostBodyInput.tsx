import { Textarea, theme } from "@chakra-ui/react";
import React from "react";
import { DeepMap, FieldError } from "react-hook-form";

import FieldErrorMessage from "./FieldErrorMessage";

type Props = {
  register: any;
  errors: DeepMap<Record<string, any>, FieldError>;
  body: string;
};

const PostBodyInput: React.FC<Props> = (props) => {
  const { register, errors, body } = props;

  return (
    <>
      {errors.body && (
        <FieldErrorMessage>{errors.body.message}</FieldErrorMessage>
      )}
      <Textarea
        rows={10}
        placeholder="本文を入力"
        name="body"
        defaultValue={body}
        ref={register({
          required: "本文を入力してください",
          maxLength: {
            value: 1000,
            message: "本文が 1000 文字を超えています",
          },
        })}
        isInvalid={errors.body}
        focusBorderColor={errors.body && theme.colors.red[600]}
        maxLength={1000}
      />
    </>
  );
};

export default PostBodyInput;
