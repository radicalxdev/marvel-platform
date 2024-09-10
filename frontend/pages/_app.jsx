import { ThemeProvider } from '@emotion/react';

import { useRouter } from 'next/router';
import { GoogleAnalytics } from 'nextjs-google-analytics';

import firebaseConfig from '@/firebase/config';

import GlobalProvider from '@/providers/GlobalProvider';

import '@/styles/globals.css';
import AppThemeProvider from '@/theme/theme';

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const { query } = useRouter();

  return (
    <AppThemeProvider>
      <GlobalProvider>
        <GoogleAnalytics
          trackPageViews
          gaMeasurementId={firebaseConfig.measurementId}
        />
        {getLayout(<Component {...pageProps} />, query)}
      </GlobalProvider>
    </AppThemeProvider>
  );
};

export default App;
