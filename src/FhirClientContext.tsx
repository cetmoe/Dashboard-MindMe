import React from 'react';
import Client from 'fhirclient/lib/Client';

interface IFhirClientContext {
  client?: Client;
}

export const FhirClientContext =
  React.createContext<IFhirClientContext>({});
