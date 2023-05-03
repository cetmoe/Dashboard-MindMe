import React from 'react';
import { useRecoilValue } from 'recoil';
import { fhirState, patientState } from '../recoil_state';
import { Observation } from 'fhir/r4b';
import { Resource } from 'fhir/r4';

const VitalSigns = () => {
  const fhir = useRecoilValue(fhirState);
  const patient = useRecoilValue(patientState);

  const createVitalSigns = () => {
    const vitalSigns = {
      resourceType: 'Observation',
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '85353-1',
            display: 'Vital signs, body weight',
          },
        ],
        text: 'Body Weight',
      },
      subject: {
        reference: `Patient/${patient?.id}`,
      },
      valueQuantity: {
        value: 70,
        unit: 'kg',
        system: 'http://unitsofmeasure.org',
        code: 'kg',
      },
      effectiveDateTime: '2023-03-30T10:00:00-04:00',
      performer: [
        {
          reference: 'Practitioner/example',
        },
      ],
    };

    fhir.client?.create(vitalSigns);
  };

  return <div></div>;
};

export default VitalSigns;
