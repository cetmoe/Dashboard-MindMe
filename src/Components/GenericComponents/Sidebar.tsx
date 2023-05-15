import React from 'react';
import { fhirState, patientState } from '../../recoilState';
import {
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import AuthenticateClient from '../AuthenticateClient';
import Button from './Button';
import { NavLink } from 'react-router-dom';
import PatientDemographics from '../PatientDemographics';

const Sidebar = () => {
  const fhir = useRecoilValue(fhirState);

  const resetClient = useResetRecoilState(fhirState);
  const resetPatient = useResetRecoilState(patientState);
  const handleLogout = () => {
    resetClient();
    resetPatient();
    sessionStorage.clear();
  };

  return (
    <div className='d-flex flex-md-column flex-row flex-nowrap align-items-center sticky-top'>
      <div className='title mb-4 mt-4'>
        <h1>MindMe</h1>
      </div>
      <ul className='nav nav-underline flex-lg-column flex-row w-100'>
        <li className='nav-item'>
          <NavLink className='nav-link link-dark' to='/'>
            Home
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink
            className='nav-link link-dark'
            to='/patients'
          >
            Search for Patients
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink
            className='nav-link link-dark'
            to='/create-document'
          >
            Upload Document
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink
            className='nav-link link-dark'
            to='/documents'
          >
            Patient Documents
          </NavLink>
        </li>
      </ul>
      <PatientDemographics />
      <div className='text-center mt-auto p-2'>
        {fhir.client ? (
          <Button
            handleClick={handleLogout}
            text={'Logout'}
          />
        ) : (
          <AuthenticateClient />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
