import * as React from 'react';

import {InnerContext} from '../../context/innerContext';
import {PageContent} from '../../models';

export function useContent<T extends object = object>() {
    const {content, setContent} = React.useContext(InnerContext);
    return {
        content: content as T & PageContent,
        setContent: setContent as React.Dispatch<React.SetStateAction<T>>,
    };
}
