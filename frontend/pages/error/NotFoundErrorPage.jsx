import ErrorPage from './ErrorPage';

const NotFoundPage = () => (
  <ErrorPage 
    message="Oops, the page you are looking for does not exist. Let's get you back on track."
    actionText="Go to Homepage"
  />
);

export default NotFoundPage;