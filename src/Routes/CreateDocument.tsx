import React from 'react';
import Sidebar from '../Components/GenericComponents/Sidebar';
import {
  ConstructDocRef,
  DataURLToBase64,
} from '../HelperFunctions';
import PDFSinglePage from '../Components/PDFSinglePage';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useRecoilValue } from 'recoil';
import { fhirState, patientState } from '../recoilState';

const CreateDocument = () => {
  const [data, setData] = React.useState<string | null>(
    null
  );

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

    fhir.client
      ?.create(documentReference, {
        headers: {
          'dips-subscription-key': import.meta.env
            .VITE_DIPS_SUBSCRIPTION_KEY,
        },
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Sidebar />
      <div className='main-container'>
        <input
          onChange={HandleFileChange}
          type='file'
          accept='application/pdf'
        />
        <button
          onClick={() => PostDocument(data)}
          disabled={!data || !patient}
        >
          Submit PDF
        </button>
        {/* <PDFSinglePage base64string={data} /> */}
      </div>
    </>
  );
};

export default CreateDocument;
