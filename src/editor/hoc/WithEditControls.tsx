import React, {Fragment, PropsWithChildren, useContext} from 'react';

import {InnerContext} from '../../context/innerContext';
import {EditBlockProps} from '../types';

export const WithEditControls = ({children, ...props}: PropsWithChildren<EditBlockProps>) => {
    const Controls = useContext(InnerContext).editor?.ControlsComponent;

    if (!Controls) {
        return <Fragment>{children}</Fragment>;
    }

    return <Controls {...props}>{children}</Controls>;
};
