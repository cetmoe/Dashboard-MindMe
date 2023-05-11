import React from 'react';
import PatientDemographics from '../Components/PatientDemographics';
import Base from './Base';

// utvid
const Dashboard = () => {
  return (
    <>
      <Base>
        <h1>Dashboard</h1>
        <p>
          You can select patients from a list, and
          create/read documents related to that patient.
        </p>

        <PatientDemographics />
      </Base>
    </>
  );
};

export default Dashboard;
