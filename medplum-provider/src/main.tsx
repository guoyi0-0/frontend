import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { MedplumClient } from '@medplum/core';
import { MedplumProvider } from '@medplum/react';
// import '@medplum/react/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from './App';

const medplum = new MedplumClient({
  onUnauthenticated: () => (window.location.href = '/'),
   //baseUrl: 'http://localhost:8103/', // Uncomment this to run against the server on your localhost
  cacheTime: 60000,
  autoBatchTime: 100,
});

const theme = createTheme({
  colors: {
    main: ['#FDE8E8', '#FBCBCB', '#F8AAAA', '#F68383', '#F45D5D', '#F33333', '#F22222', '#F00000', '#DC0000', '#C70000'],
    shades: ['#E6D2D2', '#CCB4B4', '#B39595', '#997777', '#805959', '#664040', '#4C2B2B', '#331515', '#1A0000', '#000000'],
    tints: ['#FBE2E2', '#F6C2C2', '#F1A2A2', '#EC8282', '#E76262', '#E24242', '#DD2222', '#D80202', '#D30101', '#CE0000'],
    logo: ['#FBE3E3', '#F7C5C5', '#F4A8A8', '#F08A8A', '#EC6D6D', '#E84F4F', '#E53232', '#E11414', '#DD0000', '#D80000'],
  },
  primaryColor: 'shades',
  headings: {
    sizes: {
      h1: {
        fontSize: '1.125rem',
        fontWeight: '500',
        lineHeight: '2.0',
      },
    },
  },
  fontSizes: {
    xs: '0.8rem',
    sm: '0.875rem',
    md: '0.875rem',
    lg: '1.0rem',
    xl: '1.125rem',
  },
});



const router = createBrowserRouter([{ path: '*', element: <App /> }]);

const navigate = (path: string): Promise<void> => router.navigate(path);

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);
root.render(
  <StrictMode>
    <MedplumProvider medplum={medplum} navigate={navigate}>
      <MantineProvider theme={theme}>
        <Notifications position="bottom-right" />
        <RouterProvider router={router} />
      </MantineProvider>
    </MedplumProvider>
  </StrictMode>
);
