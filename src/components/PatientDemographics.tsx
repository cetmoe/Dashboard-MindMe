import React from 'react';
import { patientState } from '../recoilState';
import { useRecoilValue } from 'recoil';

const PatientDemographics = () => {
  const patient = useRecoilValue(patientState);

  return (
    <>
      {patient ? (
        <div className='patient-demographics'>
          {patient.name?.[0].given}
          {patient.name?.[0].family}
          {patient.gender}
          {patient.birthDate}
          {patient.maritalStatus?.text}
        </div>
      ) : null}
    </>
  );
};

export default PatientDemographics;
