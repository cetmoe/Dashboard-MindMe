import React, { useEffect } from 'react';
import { oauth2 as SMART } from 'fhirclient';

const Launcher = () => {
  let ignore = false;

  useEffect(() => {
    if (ignore == false) {
      SMART.authorize({
        iss: 'https://api.dips.no/fhir',
        redirectUri: '/mindme',
        clientId: 'dashboard-mindme',
        clientSecret: import.meta.env.VITE_CLIENT_SECRET,
        scope: 'openid offline_access',
      });
    }

    return () => {
      ignore = true;
    };
  }, []);

  return <>Loading..</>;
};

export default Launcher;
