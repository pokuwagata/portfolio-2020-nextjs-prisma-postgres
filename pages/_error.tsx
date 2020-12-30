import ErrorBox from "../components/ErrorBox";

function Error({ message }) {
  return <ErrorBox message={message} />;
}

Error.getInitialProps = ({ err }) => {
  return { message: err ? err.message : "" };
};

export default Error;
