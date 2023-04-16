import { R4 } from '@ahryman40k/ts-fhir-types';
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

const patientState = atom<R4.IPatient | null>({
  key: 'Patient',
  default: null,
});

export { fhirState, patientState };
