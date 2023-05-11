import React, { useEffect, useState } from 'react';
import PDFSinglePage from '../Components/PDFSinglePage';
import { fhirState } from '../recoilState';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import Base from './Base';

const ViewDocument = () => {
  const fhir = useRecoilValue(fhirState);

  const [data, setData] = useState<string | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();

  if (id === null || !fhir.client) navigate('/');

  const GetDocument = () => {
    if (fhir.client) {
      fhir.client
        .request({
          url: `Binary/${id}`,
          headers: {
            'dips-subscription-key': import.meta.env
              .VITE_DIPS_SUBSCRIPTION_KEY,
          },
        })
        .then((res) => setData(res.data));
    }
  };

  let initialized = false;
  useEffect(() => {
    if (!initialized) {
      GetDocument();
    }

    return () => {
      initialized = true;
    };
  }, []);

  return (
    <Base>
      <PDFSinglePage base64string={data} />
    </Base>
  );
};

export default ViewDocument;
