import {
  DocumentReference,
  Patient,
  Practitioner,
} from 'fhir/r4';
import Client from 'fhirclient/lib/Client';
import { atom } from 'recoil';
import { defaultPractitioner } from './defaults';
import { type } from 'os';

interface IFhirState {
  client: Client | null;
  init: boolean;
}

interface IDocumentListState {
  patientId: string | null;
  list: DocumentReference[];
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

const documentListState = atom<IDocumentListState>({
  key: 'DocumentList',
  default: {
    patientId: null,
    list: [] as DocumentReference[],
  },
});

export {
  fhirState,
  patientState,
  patientListState,
  practitionerState,
  documentListState,
};

export type { IFhirState, IDocumentListState };
