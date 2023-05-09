import React from 'react';
import '../styles/sidebar.css';
import { Patient, Practitioner } from 'fhir/r4';

interface ILoginInfo {
  patient: Patient | null;
  practitioner: Practitioner | null;
}

const UserPatientInfo = ({
  patient,
  practitioner,
}: ILoginInfo) => {
  return (
    <div className='m-1'>
      <div className='nav-cat'>Behandler</div>
      {practitioner ? (
        <div className='user-info'>
          {`${practitioner.name?.[0].given} ${practitioner.name?.[0].family}`}
        </div>
      ) : (
        <div className='user-info'>
          No specialist logged in
        </div>
      )}
      <div className='nav-cat p-t-1'>Pasient</div>
      {patient ? (
        <div className='user-info'>
          {`${patient.name?.[0].given} ${patient.name?.[0].family}`}
        </div>
      ) : (
        <div className='user-info'>No patient selected</div>
      )}
    </div>
  );
};

export default UserPatientInfo;
