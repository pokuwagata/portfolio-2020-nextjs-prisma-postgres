import { Input, InputProps, theme } from "@chakra-ui/react";
import React from "react";
import { DeepMap, FieldError } from "react-hook-form";
import FieldErrorMessage from "./FieldErrorMessage";

type Props = {
  register: any;
  errors: DeepMap<Record<string, any>, FieldError>;
  title: string;
  style: InputProps;
};

const PostTitleInput: React.FC<Props> = (props) => {
  const { register, errors, title } = props;

  return (
    <>
      {errors.title && (
        <FieldErrorMessage>{errors.title.message}</FieldErrorMessage>
      )}
      <Input
        {...{ ...props.style }}
        defaultValue={title}
        placeholder="タイトルを入力"
        name="title"
        ref={register({
          required: "タイトルを入力してください",
          maxLength: {
            value: 100,
            message: "タイトルが 100 文字を超えています",
          },
        })}
        isInvalid={errors.title}
        focusBorderColor={errors.title && theme.colors.red[600]}
        maxLength={100}
      />
    </>
  );
};

export default PostTitleInput;
