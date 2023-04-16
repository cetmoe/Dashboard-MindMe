import React, { useEffect } from 'react';
import { oauth2 as SMART } from 'fhirclient';
import { useRecoilState } from 'recoil';
import { fhirState } from '../recoil_state';
import { Navigate, redirect } from 'react-router-dom';

const Launcher = () => {
  const [fhirClient, setFhirClient] =
    useRecoilState(fhirState);
  let ignore = false;

  useEffect(() => {
    if (ignore == false) {
      SMART.authorize({
        iss: 'https://api.dips.no/fhir',
        redirectUri: '/app',
        client_id: 'hello-open-dips-app',
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
