import { createContext } from 'react';

export const EventContext = createContext([
  // eslint-disable-next-line no-unused-vars
  (_event, _cb) => {}, // subscribe
  // eslint-disable-next-line no-unused-vars
  (_event, _cb) => {}, // unsubscribe
  // eslint-disable-next-line no-unused-vars
  (_event, _payload) => {}, // dispatch
]);
