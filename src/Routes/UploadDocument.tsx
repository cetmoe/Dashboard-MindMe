import React, { useRef, useState } from 'react';
import {
  ConstructDocRef,
  DataURLToBase64,
} from '../HelperFunctions';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useRecoilValue } from 'recoil';
import { fhirState, patientState } from '../recoilState';
import Base from './Base';
import Toast from '../Components/GenericComponents/Toast';
import Modal from '../Components/GenericComponents/Modal';
import { Console } from 'console';

const UploadDocument = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);

  const toastRef = useRef<HTMLDivElement>(null);

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
      .then(() => {
        setLoading(false);
        setStatus(true);
        showToast();
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setStatus(false);
        showToast();
      });
  };

  const showToast = () => {
    if (toastRef.current) {
      toastRef.current.classList.add('show');
    }
  };

  let initialized = false;
  document.addEventListener('DOMContentLoaded', (e) => {
    initialized = true;
  });

  return (
    <Base>
      <h1 className='display-5'>Upload Document</h1>
      <hr />
      <p>
        Uploads a PDF document for the given patient to Open
        DIPS journal.
      </p>
      <label>{'Select a PDF document: '}</label>
      <br />
      <div></div>
      <input
        onChange={HandleFileChange}
        type='file'
        className='mt-2 form-control'
        accept='application/pdf'
      />
      <br />
      <button
        className='btn btn-outline-primary mt-2'
        data-bs-toggle='modal'
        data-bs-target='#warning'
        disabled={!data || !patient || loading}
      >
        {loading ? (
          <>
            <span
              className='spinner-border spinner-border-sm'
              role='status'
              aria-hidden='true'
            />{' '}
            Sending...
          </>
        ) : (
          'Submit to Open DIPS'
        )}
      </button>
      <Modal
        id={'warning'}
        fn={() => PostDocument(data)}
        title='Warning'
        body='Do not upload documents or sensitive information not relating to the current patient'
        btnBody='Upload'
      />
      <Toast
        toastRef={toastRef}
        icon={status ? 'check2-all' : 'x-circle'}
        title={status ? 'Success' : 'Error'}
        message={
          status
            ? 'PDF Document uploaded successfully.'
            : 'Failed to upload PDF document.'
        }
      />
    </Base>
  );
};

export default UploadDocument;
