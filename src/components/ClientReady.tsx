import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fhirState } from '../recoil_state';
import { oauth2 as SMART } from 'fhirclient';
import Client from 'fhirclient/lib/Client';
import { useNavigate } from 'react-router-dom';

const ClientReady = () => {
  const [fhir, setFhir] = useRecoilState(fhirState);
  let initialized = false;
  const navigate = useNavigate();

  useEffect(() => {
    const onClient = async () => {
      await SMART.ready().then((client) => {
        setFhir({
          client: client,
          init: true,
        });
      });
    };

    if (!initialized) {
      onClient().then(() => navigate('/'));
    }

    return () => {
      initialized = true;
    };
  }, []);

  return <div>Initializing</div>;
};

export default ClientReady;
