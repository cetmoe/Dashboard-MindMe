import React from 'react';
import { oauth2 as SMART } from 'fhirclient';
import '../styles/sidebar.css';
import Button from './GenericComponents/Button';

const AuthenticateClient = () => {
  const signInOpenDips = () => {
    SMART.authorize({
      iss: 'https://api.dips.no/fhir',
      redirectUri: '/mindme',
      clientId: 'dashboard-mindme',
      // Should not be done in a production environment
      // The browser cannot securely keep client secrets
      // it is a better solution to do api calls on a server
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
      scope: 'openid profile offline_access',
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

export default AuthenticateClient;
