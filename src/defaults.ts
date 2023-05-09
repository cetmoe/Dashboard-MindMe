import { Practitioner } from 'fhir/r4';

const defaultPractitioner: Practitioner = {
  resourceType: 'Practitioner',
  id: 'stf2008174',
  meta: {
    lastUpdated: '2009-01-29T14:03:34+01:00',
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
      value: '2008174',
    },
  ],
  active: true,
  name: [
    {
      family: 'Scrum',
      given: ['Amalie'],
    },
  ],
  gender: 'female',
  birthDate: '1962-01-14',
};

export { defaultPractitioner };
