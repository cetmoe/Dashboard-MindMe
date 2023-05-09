import React from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {
  fhirState,
  patientListState,
  patientState,
} from '../recoilState';
import Sidebar from './GenericComponents/Sidebar';
import SearchField from './GenericComponents/SearchField';
import { Patient } from 'fhir/r4';
import { Bundle } from 'fhir/r4';

const Patients = () => {
  const setPatient = useSetRecoilState(patientState);
  const fhir = useRecoilValue(fhirState);
  const [patients, setPatients] = useRecoilState(
    patientListState
  );

  const findPatient = (given: string) => {
    if (fhir.client) {
      fhir.client
        .request({
          url: `patient/?given=${given}`,
          headers: {
            'dips-subscription-key': import.meta.env
              .VITE_DIPS_SUBSCRIPTION_KEY,
          },
        })
        .then((bundle: Bundle) => {
          const temp = bundle.entry?.map(
            (item) => item.resource as Patient
          );
          setPatients(temp as Patient[]);
        });
    }
  };

  return (
    <>
      <Sidebar />
      <div className='main-container'>
        <SearchField handleClick={findPatient} />
        <table>
          <thead>
            <tr>
              <th>Given</th>
              <th>Family</th>
              <th>Id</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Use</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient?.name?.[0].given}</td>
                <td>{patient?.name?.[0].family}</td>
                <td>{patient?.id}</td>
                <td>{patient?.address?.[0].text}</td>
                <td>{patient?.gender}</td>
                <td>
                  <button
                    onClick={() => setPatient(patient)}
                  >
                    Set as current patient
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Patients;
