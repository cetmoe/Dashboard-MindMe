import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  fhirState,
  patientListState,
  patientState,
} from '../recoilState';
import SearchField from '../Components/GenericComponents/SearchField';
import { Patient } from 'fhir/r4';
import { Bundle } from 'fhir/r4';
import Base from './Base';
import '../styles/base.css';
import Toast from '../Components/GenericComponents/Toast';

interface ISearchParams {
  given?: string;
  family?: string;
}

const Patients = () => {
  const [patient, setPatient] =
    useRecoilState(patientState);
  const fhir = useRecoilValue(fhirState);
  const [patients, setPatients] = useRecoilState(
    patientListState
  );
  const toastRef = React.useRef<HTMLDivElement>(null);

  const findPatient = ({
    given,
    family,
  }: ISearchParams) => {
    if (fhir.client) {
      const searchParams = new URLSearchParams();

      if (given != undefined)
        searchParams.append('given:contains', given);
      if (family != undefined)
        searchParams.append('family:contains', family);

      let url = 'patient/?';
      url += searchParams.toString();
      console.log(url);

      fhir.client
        .request({
          url: url,
          headers: {
            'dips-subscription-key': import.meta.env
              .VITE_DIPS_SUBSCRIPTION_KEY,
          },
        })
        .then((bundle: Bundle) => {
          if (bundle.total === 0) return;

          const temp = bundle.entry?.map(
            (item) => item.resource as Patient
          );
          setPatients(temp as Patient[]);
        })
        .catch((err) => console.log(err));
    }
  };

  const showToast = () => {
    if (toastRef.current) {
      toastRef.current.classList.add('show');
    }
  };

  return (
    <Base>
      <h1>
        Patients{' '}
        {patient
          ? '(' + patient?.name?.[0].given + ')'
          : '(No patient selected)'}
      </h1>
      <p>
        Search for patients by the given fields. All fields
        are optional.
      </p>
      <SearchField handleClick={findPatient} />
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Given</th>
            <th>Family</th>
            <th>Id</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr
              key={p.id}
              className={
                patient && p == patient
                  ? 'bg-warning-subtle pointer'
                  : 'opacity-75 pointer'
              }
              onClick={() => {
                setPatient(p);
                showToast();
              }}
            >
              <td>{p?.name?.[0].given}</td>
              <td>{p?.name?.[0].family}</td>
              <td>{p?.id}</td>
              <td>{p?.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toast
        toastRef={toastRef}
        icon={'check2-all'}
        title='Active patient set'
        message='Successfully changed patient'
      />
    </Base>
  );
};

export default Patients;
