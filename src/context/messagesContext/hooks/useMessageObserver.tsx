import {DependencyList, useEffect} from 'react';

import {Action} from '../../../types/actions';

import {useMessagesStore} from './useMessagesStore';

export const useMessageObserver = <A extends Action>(
    type: A['type'],
    callback: (payload: A['payload']) => void,
    deps: DependencyList = [],
) => {
    const {subscribe, unsubscribe} = useMessagesStore();

    useEffect(() => {
        subscribe(type, callback);

        return () => {
            unsubscribe(type, callback);
        };
    }, deps);
};

export default useMessageObserver;
