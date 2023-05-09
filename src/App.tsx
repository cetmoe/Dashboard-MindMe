import React, { useEffect } from 'react';
import { oauth2 as SMART } from 'fhirclient';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { useSetRecoilState } from 'recoil';
import { fhirState } from './recoilState';
import Dashboard from './components/Dashboard';
import ClientReady from './components/ClientReady';
import Patients from './components/Patients';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/mindme',
    element: <ClientReady />,
  },
  {
    path: '/patients',
    element: <Patients />,
  },
]);

const App = () => {
  const setFhir = useSetRecoilState(fhirState);
  let initialized = false;

  useEffect(() => {
    if (!initialized) {
      SMART.ready()
        .then((client) => {
          setFhir({
            client: client,
            init: true,
          });
        })
        .catch((e) => {
          console.log('error: ', e);
        });
    }

    return () => {
      initialized = true;
    };
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
