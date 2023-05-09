import React from 'react';
import { useRecoilValue } from 'recoil';
import { fhirState, patientState } from '../recoilState';
import Button from './GenericComponents/Button';

const DocumentReference = () => {
  const fhir = useRecoilValue(fhirState);
  const patient = useRecoilValue(patientState);

  const createDocumentReference = () => {
    const documentReference = {
      resourceType: 'DocumentReference',
      type: {
        coding: [
          {
            system: '2.16.578.1.12.4.9066',
            code: 'OPENDIPS0',
          },
        ],
      },
      subject: {
        reference: 'Patient/cdp2015801',
        identifier: {
          system:
            'http://dips.no/fhir/namingsystem/dips-patientid',
          value: '2015801',
        },
      },
      author: [
        {
          reference: 'PractitionerRole/agb1000755',
          identifier: {
            system: 'urn:oid:1.3.6.1.4.1.9038.51.1',
            value: '1000755',
          },
        },
      ],
      custodian: {
        reference: 'Organization/afa22',
        identifier: {
          system:
            'http://dips.no/fhir/namingsystem/dips-organizationid',
          value: '22',
        },
      },
      content: [
        {
          attachment: {
            contentType: 'application/pdf',
            data: 'test123',
          },
        },
      ],
    };

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
      <Button
        text={'submit'}
        handleClick={createDocumentReference}
      />
    </>
  );
};

export default DocumentReference;
