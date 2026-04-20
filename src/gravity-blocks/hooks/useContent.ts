import {useContext} from 'react';

import {PageContent} from '../../models';
import {InnerContext} from '../../context/innerContext';

export function useContent<T extends object = object>() {
    const {content, setContent} = useContext(InnerContext);
    return {
        content: content as T & PageContent,
        setContent: setContent as React.Dispatch<React.SetStateAction<T>>,
    };
}
