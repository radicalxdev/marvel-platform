import React from 'react';

import ApplicationError from '@/pages/app-error';
import NetworkError from '@/pages/network-error';

/**
 * ErrorBoundary component.
 * This component handles:
 * - Displaying an error page (`ApplicationError`) if a JavaScript error occurs in a child component.
 * - Displaying a network error page (`NetworkError`) if the network status is offline.
 *
 * @returns {JSX.Element} The ErrorBoundary component.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      isOnline: true,
    };
  }

  componentDidMount() {
    this.setState({ isOnline: window.navigator.onLine });

    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  handleOnline = () => {
    this.setState({ isOnline: true });
  };

  handleOffline = () => {
    this.setState({ isOnline: false });
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError, isOnline } = this.state;
    const { children } = this.props;

    if (!isOnline) {
      // Render NetworkErrorPage when offline
      return <NetworkError />;
    }

    if (hasError) {
      // Render ApplicationErrorPage for general errors
      return <ApplicationError />;
    }

    return children;
  }
}

export default ErrorBoundary;
