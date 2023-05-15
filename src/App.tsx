import React, { useEffect } from 'react';
import { oauth2 as SMART } from 'fhirclient';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { pdfjs } from 'react-pdf';

import { useSetRecoilState } from 'recoil';
import { fhirState } from './recoilState';
import Dashboard from './Routes/Dashboard';
import ClientReady from './Components/ClientReady';
import Patients from './Routes/Patients';
import UploadDocument from './Routes/UploadDocument';
import PatientDocuments from './Routes/PatientDocuments';
import ViewDocument from './Routes/ViewDocument';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
  {
    path: '/create-document',
    element: <UploadDocument />,
  },
  {
    path: '/documents',
    element: <PatientDocuments />,
  },
  {
    path: '/document/:id',
    element: <ViewDocument />,
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
