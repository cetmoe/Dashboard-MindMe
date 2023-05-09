import { Bundle, DocumentReference } from 'fhir/r4';
import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  patientState,
  fhirState,
  documentListState,
  IDocumentListState,
} from '../recoilState';
import Sidebar from '../Components/GenericComponents/Sidebar';
import { useNavigate } from 'react-router-dom';

const PatientDocuments = () => {
  const patient = useRecoilValue(patientState);
  const fhir = useRecoilValue(fhirState);
  const [docRefs, setDocRefs] = useRecoilState(
    documentListState
  );
  const navigate = useNavigate();

  const FindDocuments = (id: string) => {
    if (fhir.client) {
      fhir.client
        .request({
          url: `DocumentReference/?patient=${id}`,
          headers: {
            'dips-subscription-key': import.meta.env
              .VITE_DIPS_SUBSCRIPTION_KEY,
          },
        })
        .then((bundle: Bundle) => {
          const temp = bundle.entry?.map(
            (item) => item.resource as DocumentReference
          );

          const item: IDocumentListState = {
            patientId: id,
            list: temp as DocumentReference[],
          };

          setDocRefs(item);
        });
    }
  };

  let initialized = false;
  useEffect(() => {
    if (
      docRefs.patientId !== null &&
      docRefs.patientId === patient?.id
    )
      return;

    if (!initialized && patient?.id) {
      FindDocuments(patient.id);
    }

    return () => {
      initialized = true;
    };
  });

  return (
    <>
      <Sidebar />
      <div className='main-container'>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Author</th>
              <th>Custodian</th>
              <th>Type</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {docRefs.list.map((document) => (
              <tr key={document.id}>
                <td>{document?.date}</td>
                <td>{document?.author?.[0].reference}</td>
                <td>{document?.custodian?.reference}</td>
                <td>{document?.description}</td>
                <td>
                  <button
                    onClick={() => {
                      const id = document?.id;
                      if (id) {
                        navigate(`/document/${id}`);
                      }
                    }}
                  >
                    Load
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PatientDocuments;