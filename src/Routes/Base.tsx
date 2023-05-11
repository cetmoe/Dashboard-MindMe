import React from 'react';
import Sidebar from '../Components/GenericComponents/Sidebar';

const Base = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='container bg-light'>
      <div className='row'>
        <div className='col-md-3 row bg-light sticky-top border-start border-end'>
          <Sidebar />
        </div>
        <div className='col p-5 min-vh-100'>{children}</div>
      </div>
    </div>
  );
};

export default Base;
