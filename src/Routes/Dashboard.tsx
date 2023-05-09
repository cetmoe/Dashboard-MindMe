import React from 'react';
import Sidebar from '../Components/GenericComponents/Sidebar';
import PatientDemographics from '../Components/PatientDemographics';

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
