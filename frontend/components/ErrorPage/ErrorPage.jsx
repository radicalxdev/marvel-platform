import { Button, Container, Typography } from '@mui/material';

const ErrorPage = ({ message, actionText, onAction }) => (
  <Container>
    <Typography variant="h4" gutterBottom>
      {message}
    </Typography>
    <Button variant="contained" color="primary" onClick={onAction}>
      {actionText}
    </Button>
  </Container>
);

export default ErrorPage;
