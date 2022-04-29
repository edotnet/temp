import { useContext } from 'react';

import { EventContext } from '../EventContext';

export const useEventDispatch = () => {
  // eslint-disable-next-line no-unused-vars
  const [_subscribe, _unsubscribe, dispatch] = useContext(EventContext);

  return dispatch;
};
