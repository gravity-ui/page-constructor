import {DependencyList, useEffect} from 'react';

import {Action, Meta} from '../../../../common/types';

import useMessagesStore from './useMessagesStore';

export const useMessageObserver = <A extends Action>(
    type: A['type'],
    callback: (payload: A['payload'], meta: Meta) => void,
    deps: DependencyList = [],
) => {
    const {subscribe, unsubscribe} = useMessagesStore();

    useEffect(() => {
        subscribe(type, callback);

        return () => {
            unsubscribe(type, callback);
        };
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useMessageObserver;
