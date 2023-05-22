import React, {Fragment, PropsWithChildren, useContext} from 'react';

import {InnerContext} from '../../context/innerContext';
import {EditBlockControlProps} from '../types';

export const WithEditorBlockControls = ({
    children,
    ...props
}: PropsWithChildren<EditBlockControlProps>) => {
    const Controls = useContext(InnerContext).editor?.ControlsComponent;

    if (!Controls) {
        return <Fragment>{children}</Fragment>;
    }

    return <Controls {...props}>{children}</Controls>;
};
