import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { R4 } from '@ahryman40k/ts-fhir-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fhirState, patientState } from '../recoil_state';
import { fetchPatientById } from '../fhir_fetch';

// utvid
const Dashboard = () => {
  const fhir = useRecoilValue(fhirState);
  const [patient, setPatient] =
    useRecoilState(patientState);

  useEffect(() => {
    if (fhir.client) {
      fetchPatientById(
        'cdp1000807',
        fhir.client,
        setPatient
      );
    }
  }, [fhir]);

  return (
    <>
      <Sidebar />
      <div className='main-container'>
        {patient ? patient.name![0].given : 'no patient'}
      </div>
    </>
  );
};

export default Dashboard;
