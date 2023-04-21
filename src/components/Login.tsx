import React from 'react';
import { oauth2 as SMART } from 'fhirclient';
import '../styles/sidebar.css';
import Button from './Button';

const Login = () => {
  const signInOpenDips = () => {
    SMART.authorize({
      iss: 'https://api.dips.no/fhir',
      redirectUri: '/mindme',
      clientId: 'dashboard-mindme',
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
      scope: 'openid offline_access',
    });
  };

  return (
    <div className='m-1'>
      <Button
        handleClick={signInOpenDips}
        text={'Login with Open DIPS'}
      />
    </div>
  );
};

export default Login;
