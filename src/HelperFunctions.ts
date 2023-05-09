import Client from 'fhirclient/lib/Client';
import { SetterOrUpdater } from 'recoil';
import { Patient, DocumentReference } from 'fhir/r4';

const FetchPatientById = async (
  id: string,
  client: Client,
  setter: SetterOrUpdater<Patient | null>
) => {
  await client
    .request({
      url: `/Patient/${id}`,
      headers: {
        'dips-subscription-key': import.meta.env
          .VITE_DIPS_SUBSCRIPTION_KEY,
      },
    })
    .then((patient) => setter(patient))
    .catch((error) => console.log(error));
};

const DataURLToBase64 = (
  result: string | ArrayBuffer | null
) => {
  if (result instanceof ArrayBuffer) return null;
  if (result === null) return null;
  return result.split(',')[1];
};

const ConstructDocRef = (
  patient: Patient,
  data: string
) => {
  const docRef = {
    resourceType: 'DocumentReference',
    status: 'current',
    type: {
      coding: [
        {
          system: '2.16.578.1.12.4.9066',
          code: 'OPENDIPS0',
        },
      ],
    },
    subject: {
      reference: `Patient/${patient.id}`,
      identifier: {
        system:
          'http://dips.no/fhir/namingsystem/dips-patientid',
        value: patient.identifier?.[0].value,
      },
    },
    author: [
      {
        reference: `PractitionerRole/agb1000755`,
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
          data: data,
        },
      },
    ],
  };

  return docRef;
};

export {
  FetchPatientById,
  ConstructDocRef,
  DataURLToBase64,
};
