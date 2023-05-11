import React, { useState } from 'react';
import Sidebar from '../Components/GenericComponents/Sidebar';
import {
  ConstructDocRef,
  DataURLToBase64,
} from '../HelperFunctions';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useRecoilValue } from 'recoil';
import { fhirState, patientState } from '../recoilState';
import Base from './Base';

const CreateDocument = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fhir = useRecoilValue(fhirState);
  const patient = useRecoilValue(patientState);

  const HandleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          setData(DataURLToBase64(reader.result));
        },
        false
      );

      reader.readAsDataURL(file);
    }
  };

  const PostDocument = (file: string | null) => {
    if (!patient || !file) return;

    const documentReference = ConstructDocRef(
      patient,
      file
    );

    setLoading(true);

    fhir.client
      ?.create(documentReference, {
        headers: {
          'dips-subscription-key': import.meta.env
            .VITE_DIPS_SUBSCRIPTION_KEY,
        },
      })
      .then(() => setLoading(false))
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  return (
    <Base>
      <h1>Create Document</h1>
      <p>Creates a PDF document for the given patient.</p>
      <label>
        {'Select a PDF document: '}
        <input
          onChange={HandleFileChange}
          type='file'
          accept='application/pdf'
        />
      </label>
      <button
        onClick={() => PostDocument(data)}
        disabled={!data || !patient || loading}
      >
        {loading ? (
          <>
            <span
              className='spinner-border spinner-border-sm'
              role='status'
              aria-hidden='true'
            />
            Sending...
          </>
        ) : (
          'Submit'
        )}
      </button>
    </Base>
  );
};

export default CreateDocument;
