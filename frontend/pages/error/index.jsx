import { Box, Button, Container, Typography } from '@mui/material';

const NetworkErrorPage = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Container
      sx={{
        backgroundColor: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 'auto',
          marginTop: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'primary.main',
          }}
        >
          KAI.AI
        </Typography>
        <Typography variant="subtitle1">AI TEACHING ASSISTANT</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Network Error
        </Typography>
        <Typography sx={{ mb: 4, maxWidth: '400px', textAlign: 'center' }}>
          Seems like there is a problem with your internet, try reconnecting and
          refresh the page to continue
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Reload the page
        </Button>
      </Box>
    </Container>
  );
};
export default NetworkErrorPage;
