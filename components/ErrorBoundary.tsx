import { Component } from "react";

import ErrorBox from "./ErrorBox";

class ErrorBoundary extends Component<
  {},
  { hasError: boolean; message?: string }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBox message={this.state.message} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
