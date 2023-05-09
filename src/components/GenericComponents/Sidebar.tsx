import React from 'react';
import '../../styles/sidebar.css';
import {
  fhirState,
  patientState,
  practitionerState,
} from '../../recoilState';
import {
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import UserPatientInfo from '../DemoInfo';
import AuthenticateClient from '../AuthenticateClient';
import Button from './Button';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const fhir = useRecoilValue(fhirState);
  const patient = useRecoilValue(patientState);
  const practitioner = useRecoilValue(practitionerState);

  const resetClient = useResetRecoilState(fhirState);
  const resetPatient = useResetRecoilState(patientState);
  const handleLogout = () => {
    resetClient();
    resetPatient();
  };

  return (
    <div className='sidebar flex-column'>
      <div className='sidebar-title'>MindMe</div>
      <div className='sidebar-content'>
        {fhir.client != null ? (
          <UserPatientInfo
            patient={patient}
            practitioner={practitioner}
          />
        ) : (
          <AuthenticateClient />
        )}
      </div>
      <div className='sidebar-content'>
        <div className='nav-cat p-l-1'>Handlinger</div>
        <Link className='sidebar-nav-item' to='/'>
          Home
        </Link>
        <Link className='sidebar-nav-item' to='/patients'>
          Search for Patients
        </Link>
        <div className='sidebar-nav-item'>
          Create Vital Signs
        </div>
      </div>
      <div className='bottom-sidebar'>
        {fhir.client ? (
          <Button
            handleClick={handleLogout}
            text={'Logout'}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
