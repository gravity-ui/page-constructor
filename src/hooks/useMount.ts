import {useEffect} from 'react';

type Unsubscribe = () => void;

export default function useMount(handler: () => Unsubscribe | void): void {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(handler, []);
}
