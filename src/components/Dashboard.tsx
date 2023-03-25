import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { FhirClientContext } from '../FhirClientContext';
import { R4 } from '@ahryman40k/ts-fhir-types';

// utvid
const Dashboard = () => {
  const { client } = React.useContext(FhirClientContext);
  const [patient, setPatient] = useState<R4.IPatient>();

  useEffect(() => {
    console.log(import.meta.env.VITE_DIPS_SUBSCRIPTION_KEY);
    if (client) {
      const fetchPatientById = async (id: string) => {
        await client
          .request({
            url: `/Patient/${id}`,
            headers: {
              'dips-subscription-key': import.meta.env
                .VITE_DIPS_SUBSCRIPTION_KEY,
            },
          })
          .then((patient) => setPatient(patient))
          .catch((error) => console.log(error));
      };

      fetchPatientById('cdp1000807');
    }
  }, [client]);

  return (
    <div>
      <Sidebar />
      <div className='main-container'>
        <div>
          {patient ? (
            <div>{patient.name![0].given}</div>
          ) : (
            <div>No patient found</div>
          )}
        </div>
        <div>
          {client ? (
            <div>Client is ready</div>
          ) : (
            <div>Client is not ready</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
