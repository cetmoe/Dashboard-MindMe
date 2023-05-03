import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fhirState, patientState } from '../recoil_state';
import { fetchPatientById } from '../fhir_fetch';
import PatientDemographics from './PatientDemographics';
import VitalSigns from './VitalSigns';

// utvid
const Dashboard = () => {
  const fhir = useRecoilValue(fhirState);
  const [patient, setPatient] =
    useRecoilState(patientState);

  useEffect(() => {
    if (fhir.client && !patient) {
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
        <PatientDemographics />
        <VitalSigns />
      </div>
    </>
  );
};

export default Dashboard;
