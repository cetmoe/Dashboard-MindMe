import React, { useEffect, useState } from 'react';
import { oauth2 as SMART } from 'fhirclient';
import Client from 'fhirclient/lib/Client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { RecoilRoot, useRecoilState } from 'recoil';
import { fhirState } from './recoil_state';
import Dashboard from './components/Dashboard';
import Launcher from './components/Launcher';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Launcher />,
  },
  {
    path: '/app',
    element: <Dashboard />,
  },
]);

const App = () => {
  const [fhir, setFhir] = useRecoilState(fhirState);
  let initialized = false;

  useEffect(() => {
    if (!initialized) {
      SMART.ready().then((client) => {
        setFhir({
          client: client,
          init: true,
        });
      });
    }

    return () => {
      initialized = true;
    };
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
