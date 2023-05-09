import React from 'react';
import Sidebar from './GenericComponents/Sidebar';
import PatientDemographics from './PatientDemographics';

// utvid
const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <div className='main-container'>
        <PatientDemographics />
      </div>
    </>
  );
};

export default Dashboard;
