import { Practitioner } from 'fhir/r4';

const defaultPractitioner: Practitioner = {
  resourceType: 'Practitioner',
  id: 'stf1000099',
  meta: {
    lastUpdated: '2004-10-06T08:49:12+02:00',
    profile: ['DIPSPractitioner', 'NoBasisPractitioner'],
    tag: [
      {
        system:
          'http://dips.no/fhir/namingsystem/practitionersource',
        code: 'practitioner',
      },
    ],
  },
  extension: [
    {
      url: 'http://dips.no/fhir/StructureDefinition/R4/IsSpecialistExtension',
      valueBoolean: false,
    },
  ],
  identifier: [
    {
      use: 'official',
      system:
        'http://dips.no/fhir/namingsystem/dips-personid',
      value: '1000099',
    },
  ],
  active: true,
  name: [
    {
      family: 'Innleggelse (Testplan Pas-Team)',
      given: ['Anne'],
    },
  ],
  gender: 'unknown',
  birthDate: '1968-03-12',
};

export { defaultPractitioner };
