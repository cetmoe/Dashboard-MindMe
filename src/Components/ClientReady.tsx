import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { fhirState } from '../recoilState';
import { oauth2 as SMART } from 'fhirclient';
import { useNavigate } from 'react-router-dom';

const ClientReady = () => {
  const setFhir = useSetRecoilState(fhirState);
  let initialized = false;
  const navigate = useNavigate();

  useEffect(() => {
    const onClient = async () => {
      await SMART.ready()
        .then((client) => {
          setFhir({
            client: client,
            init: true,
          });
        })
        .catch((e) => {
          console.log(e);
        });

      navigate('/');
    };

    if (!initialized) {
      onClient();
    }

    return () => {
      initialized = true;
    };
  }, []);

  return <div>Initializing</div>;
};

export default ClientReady;
