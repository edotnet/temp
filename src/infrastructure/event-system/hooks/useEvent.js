import { useEffect, useContext } from 'react';

import { EventContext } from '../EventContext';

export const useEvent = (events, callback) => {
  // eslint-disable-next-line no-unused-vars
  const [subscribe, unsubscribe, _dispatch] = useContext(EventContext);

  useEffect(() => {
    let arrEvents = events;
    if (!Array.isArray(events)) {
      arrEvents = [events];
    }
    arrEvents.map((event) => subscribe(event, callback));

    return () => arrEvents.map((event) => unsubscribe(event, callback));
  }, [subscribe, unsubscribe, events, callback]);
};
