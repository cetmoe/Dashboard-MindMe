import React from 'react';
import Base from './Base';

// utvid
const Dashboard = () => {
  return (
    <>
      <Base>
        <h1>Proof of Concept Dashboard</h1>
        <p>
          The dashboard serves as a proof of concept for
          third-party SMART on FHIR applications outside of
          the EHR system.
        </p>
        <p>There features implemented in this demo are:</p>
        <ul>
          <li>Search for patients by their given name.</li>
          <li>
            Select a patient from the list as the current
            patient.
          </li>
          <li>
            Upload a DocumentReference to with a patients
            id.
          </li>
          <li>
            View a list of documents tied to the current
            patient.
          </li>
          <li>
            View the document in a barebones PDF viewer.
          </li>
        </ul>
        <p>
          Since this is a demo and the FHIR resrouces
          Questionnaire and QuestionnaireResponse is not
          implemented by Open DIPS, you can only create/read
          DocumentReference resources.
        </p>
      </Base>
    </>
  );
};

export default Dashboard;
