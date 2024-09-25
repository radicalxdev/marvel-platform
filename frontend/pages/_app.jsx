import { useRouter } from 'next/router';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { Provider } from 'react-redux';

import firebaseConfig from '@/firebase/config';

import GlobalProvider from '@/providers/GlobalProvider';
import store from '@/redux/store';

import '@/styles/globals.css';
import AppThemeProvider from '@/theme/theme';

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const { query } = useRouter();

  return (
    <Provider store={store}>
      <AppThemeProvider>
        <GlobalProvider>
          <GoogleAnalytics
            trackPageViews
            gaMeasurementId={firebaseConfig.measurementId}
          />
          {getLayout(<Component {...pageProps} />, query)}
        </GlobalProvider>
      </AppThemeProvider>
    </Provider>
  );
};

export default App;
