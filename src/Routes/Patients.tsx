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
import Sidebar from '../Components/GenericComponents/Sidebar';
import SearchField from '../Components/GenericComponents/SearchField';
import { Patient } from 'fhir/r4';
import { Bundle } from 'fhir/r4';
import Base from './Base';

const Patients = () => {
  const [patient, setPatient] =
    useRecoilState(patientState);
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
    <Base>
      <h1>Patients</h1>
      <p>
        Search for patients by given name. An empty search
        will list all patients.
      </p>
      <SearchField handleClick={findPatient} />
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Given</th>
            <th>Family</th>
            <th>Id</th>
            <th>Gender</th>
            <th>Set Patient</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr
              key={p.id}
              className={
                patient && p == patient
                  ? 'bg-warning-subtle'
                  : 'opacity-75'
              }
            >
              <td>{p?.name?.[0].given}</td>
              <td>{p?.name?.[0].family}</td>
              <td>{p?.id}</td>
              <td>{p?.gender}</td>
              <td>
                <button onClick={() => setPatient(p)}>
                  Set
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Base>
  );
};

export default Patients;
