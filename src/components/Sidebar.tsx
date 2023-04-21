import React from 'react';
import '../styles/sidebar.css';
import { fhirState, patientState } from '../recoil_state';
import { useRecoilState, useRecoilValue } from 'recoil';
import LoginInfo from './LoginInfo';
import Login from './Login';

const Sidebar = () => {
  const fhir = useRecoilValue(fhirState);
  const [patient, setPatient] =
    useRecoilState(patientState);
  let specialist: any;

  return (
    <div className='sidebar flex-column'>
      <div className='sidebar-title'>MindMe</div>
      <div className='sidebar-content'>
        {fhir.client != null ? (
          <LoginInfo
            patient={patient}
            specialist={specialist}
          />
        ) : (
          <Login />
        )}
      </div>
      <div className='sidebar-content'>
        <div className='nav-cat p-l-1'>Handlinger</div>
        <div className='sidebar-nav-item'>Search</div>
        <div className='sidebar-nav-item'>
          Create Vital Signs
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
