import React from 'react';
import '../styles/sidebar.css';
import { Patient } from 'fhir/r4b';

interface ILoginInfo {
  patient: Patient | null;
  specialist: any | null;
}

const LoginInfo = ({ patient, specialist }: ILoginInfo) => {
  return (
    <div className='m-1'>
      <div className='nav-cat'>Behandler</div>
      {specialist ? (
        <div className='user-info'>
          {`${specialist.name![0].given} ${
            specialist.name![0].family
          }`}
        </div>
      ) : (
        <div className='user-info'>
          No specialist logged in
        </div>
      )}
      <div className='nav-cat p-t-1'>Pasient</div>
      {patient ? (
        <div className='user-info'>
          {`${patient.name![0].given} ${
            patient.name![0].family
          }`}
        </div>
      ) : (
        <div className='user-info'>No patient selected</div>
      )}
    </div>
  );
};

export default LoginInfo;
