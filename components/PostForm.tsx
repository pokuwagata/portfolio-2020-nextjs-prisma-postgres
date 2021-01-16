import { BoxProps, chakra, theme } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

import { PostReqInput } from "../types/post";

import PostBodyInput from "./PostBodyInput";
import PostTitleInput from "./PostTitleInput";

type Props = {
  submitCallBack: (post: PostReqInput) => void;
  post?: PostReqInput;
};

const PostForm: React.FC<Props> = (props) => {
  const { register, handleSubmit, errors } = useForm({ mode: "all" });
  const { title, body } = props.post ?? { title: "", body: "" };

  const onSubmit = (post: PostReqInput) => {
    if (Object.keys(errors).length > 0) return;
    props.submitCallBack(post);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <PostTitleInput
          style={{ autoFocus: true }}
          {...{ errors, register, title }}
        />
      </Wrapper>
      <Wrapper>
        <PostBodyInput {...{ errors, register, body }} />
      </Wrapper>
      {/* なぜか余白が発生するので調整 */}
      <Wrapper mt={"-" + theme.space[2]}>{props.children}</Wrapper>
    </form>
  );
};

const Wrapper: React.FC<BoxProps> = (props) => (
  <chakra.div mb={theme.space[4]} _last={{ mb: 0 }} {...props}>
    {props.children}
  </chakra.div>
);

export default PostForm;
