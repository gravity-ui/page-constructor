import React, {Fragment, PropsWithChildren, useContext} from 'react';

import {EditorContext} from '../../context';
import {EditBlockConstructorProps} from '../../types';

export const EditControlsInjector = (props: PropsWithChildren<EditBlockConstructorProps>) => {
    const renderControls = useContext(EditorContext)?.renderControls;

    if (!renderControls) {
        return <Fragment>{props.children}</Fragment>;
    }

    return renderControls(props);
};
