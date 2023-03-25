import React from 'react';
import { oauth2 as SMART } from 'fhirclient';
export default class Launcher extends React.Component {
  componentDidMount(): void {
    SMART.authorize({
      iss: 'https://api.dips.no/fhir',
      redirectUri: '/app',
      client_id: 'hello-open-dips-app', // workaround until we get a client id
      scope: 'openid offline_access',
    });
  }
  render() {
    return <div>Launching..</div>;
  }
}
