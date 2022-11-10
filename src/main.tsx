import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import App from './App';
import store from './store';
import { GlobalStyle, theme } from './styles';

const history = createBrowserHistory();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 1000 * 60,
      keepPreviousData: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
    </QueryClientProvider>
  </Provider>
);

export const rootNavigate = (to: string) => {
  history.push(to);
};
