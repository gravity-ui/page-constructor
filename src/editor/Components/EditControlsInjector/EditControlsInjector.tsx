import React, {Fragment, PropsWithChildren, useContext} from 'react';

import {EditorContext} from '../../context';
import {EditBlockConstructorProps} from '../../types';

export const EditControlsInjector = (props: PropsWithChildren<EditBlockConstructorProps>) => {
    const renderEditControls = useContext(EditorContext)?.renderEditControls;

    if (!renderEditControls) {
        return <Fragment>{props.children}</Fragment>;
    }

    return renderEditControls(props);
};
