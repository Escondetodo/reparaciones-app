import { Component, type ReactNode } from "react";
import Alert from "./components/ui/Alert";

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error capturado:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Alert description="Algo salió mal" variant="danger" />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
