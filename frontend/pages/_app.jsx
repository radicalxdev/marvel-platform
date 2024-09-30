import { GoogleAnalytics } from 'nextjs-google-analytics';

import firebaseConfig from '@/firebase/config';

import GlobalProvider from '@/providers/GlobalProvider';

import '@/styles/globals.css';
import AppThemeProvider from '@/theme/theme';
import withLayoutRedirect from '@/hoc/withLayoutRedirect';

const App = ({ Component, pageProps }) => {
  const LayoutWrapper = withLayoutRedirect(Component);

  return (
    <GlobalProvider>
      <AppThemeProvider>
        <GoogleAnalytics
          trackPageViews
          gaMeasurementId={firebaseConfig.measurementId}
        />
        <LayoutWrapper {...pageProps} />
      </AppThemeProvider>
    </GlobalProvider>
  );
};

export default App;
