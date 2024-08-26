import { ThemeProvider } from '@emotion/react';
import { useRouter } from 'next/router';
import { GoogleAnalytics } from 'nextjs-google-analytics';

import ErrorBoundary from '@/components/ErrorBoundary';

import firebaseConfig from '@/firebase/config';
import GlobalProvider from '@/providers/GlobalProvider';
import theme from '@/theme/theme';

import '@/styles/globals.css';

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const { query } = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <GoogleAnalytics
          trackPageViews
          gaMeasurementId={firebaseConfig.measurementId}
        />
        <ErrorBoundary>
          {getLayout(<Component {...pageProps} />, query)}
        </ErrorBoundary>
      </GlobalProvider>
    </ThemeProvider>
  );
};

export default App;
