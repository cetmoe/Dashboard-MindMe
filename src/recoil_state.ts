import { Patient } from 'fhir/r4b';
import Client from 'fhirclient/lib/Client';
import { RecoilState, atom, selector } from 'recoil';

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

export { fhirState, patientState };
