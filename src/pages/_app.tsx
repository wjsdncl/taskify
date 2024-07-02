import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Modal from '@/components/Modal';
import MainLayout from '@/layouts/MainLayout';
import { store, persistor } from '@/store/store';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Modal />
          <Head>
            <title>Taskify</title>
            <meta property='og:title' content='Taskify' />
            <meta property='og:description' content='새로운 일정 관리 Taskify' />
            <meta property='og:image' content='/images/logo_large.png' />
            <meta property='og:url' content='https://5teamtaskify.netlify.app/' />
            <meta property='og:type' content='website' />
          </Head>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
