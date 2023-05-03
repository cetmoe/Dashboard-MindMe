import { Patient } from 'fhir/r4b';
import Client from 'fhirclient/lib/Client';
import { SetterOrUpdater } from 'recoil';

const fetchPatientById = async (
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

export { fetchPatientById };
