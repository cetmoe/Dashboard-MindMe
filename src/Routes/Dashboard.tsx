import React from 'react';
import Base from './Base';

// utvid
const Dashboard = () => {
  return (
    <>
      <Base>
        <h1 className='display-5 '>
          Proof of Concept Dashboard
        </h1>
        <hr />
        <p>
          The dashboard serves as a proof of concept for
          third-party SMART on FHIR applications outside of
          the EHR system.
        </p>
        <p>
          There are a couple of features that are
          implemented in this demo which are listed below.
        </p>
        <p>You may:</p>
        <ul>
          <li>Search for patients by their given name.</li>
          <li>
            Select a patient from the list as the current
            patient.
          </li>
          <li>
            Upload a PDF which creates a DocumentReference
            in Open DIPS with a reference to the PDF, the
            current patient and the current Practitioner.
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
          Since this is a demo and the FHIR resources
          Questionnaire and QuestionnaireResponse are not
          implemented by Open DIPS, you are limited to
          DocumentReference resources.
        </p>
        <p>
          There is currently no check for Login, so you may
          visit all the subpages without logging in. The
          features will however not work without being
          logged in.
        </p>
      </Base>
    </>
  );
};

export default Dashboard;
