import { NextPage } from "next";
import ErrorBox from "../components/ErrorBox";

const NotFound: NextPage = (props) => {
  return (
    <ErrorBox
      title="404 NotFound"
      message="お探しのページは見つかりませんでした"
    />
  );
};

export default NotFound;
