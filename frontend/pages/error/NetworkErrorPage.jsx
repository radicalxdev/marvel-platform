import ErrorPage from './ErrorPage';

const NetworkErrorPage = () => (
  <ErrorPage 
    message="Oops, it seems a Network Error Occurred. Please check your internet connection and try again."
    actionText="Retry"
    onAction={() => window.location.reload()}
  />
);

export default NetworkErrorPage;