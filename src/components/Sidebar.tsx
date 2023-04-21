import React from 'react';
import '../styles/sidebar.css';
import { fhirState, patientState } from '../recoil_state';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import LoginInfo from './LoginInfo';
import Login from './Login';
import Button from './Button';

const Sidebar = () => {
  const fhir = useRecoilValue(fhirState);
  const [patient, setPatient] =
    useRecoilState(patientState);
  let specialist: any;
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
