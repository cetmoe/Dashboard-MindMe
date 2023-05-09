import { Patient, Practitioner } from 'fhir/r4';
import Client from 'fhirclient/lib/Client';
import { atom } from 'recoil';
import { defaultPractitioner } from './defaults';

interface IFhirState {
  client: Client | null;
  init: boolean;
}

const fhirState = atom<IFhirState>({
  key: 'FHIR',
  default: {
    client: null,
    init: false,
  },
});

const patientState = atom<Patient | null>({
  key: 'Patient',
  default: null,
});

const practitionerState = atom<Practitioner | null>({
  key: 'Practitioner',
  default: defaultPractitioner,
});

const patientListState = atom<Patient[]>({
  key: 'PatientList',
  default: [] as Patient[],
});

export {
  fhirState,
  patientState,
  patientListState,
  practitionerState,
};
