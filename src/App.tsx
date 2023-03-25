import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import { oauth2 as SMART } from 'fhirclient';
import Client from 'fhirclient/lib/Client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Launcher from './components/Launcher';
import { FhirClientContext } from './FhirClientContext';

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

let init = false;

const App = () => {
  const [client, setClient] = useState<Client>();

  useEffect(() => {
    if (!init) {
      init = true;
      SMART.ready().then((client) => {
        setClient(client);
      });
    }
  }, []);

  return (
    <FhirClientContext.Provider value={{ client: client }}>
      <RouterProvider router={router} />
    </FhirClientContext.Provider>
  );
};

export default App;
