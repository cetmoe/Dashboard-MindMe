import React from 'react';
import { patientState } from '../recoilState';
import { useRecoilValue } from 'recoil';

const PatientDemographics = () => {
  const patient = useRecoilValue(patientState);

  if (!patient) return null;
  return (
    <>
      <div className='card w-100 mt-5'>
        <div className='card-body'>
          <h5 className='card-title'>
            {patient.name?.[0].given +
              ' ' +
              patient.name?.[0].family}
          </h5>
        </div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            {patient.birthDate}
          </li>
          <li className='list-group-item'>
            {typeof patient?.gender == 'string'
              ? patient.gender?.charAt(0).toUpperCase() +
                patient.gender?.slice(1)
              : ''}
          </li>
          <li className='list-group-item'>
            {patient.deceasedBoolean == true
              ? 'Alive'
              : 'Dead'}
          </li>
        </ul>
      </div>
    </>
  );
};

export default PatientDemographics;
