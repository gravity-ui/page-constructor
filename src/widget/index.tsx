import React from 'react';

import ReactDOM from 'react-dom';

import {PageConstructor, PageConstructorProvider} from '../containers/PageConstructor';
import {DeviceFrameMessageType} from '../editor/widget/constants';

import './styles.scss';

const root = document.createElement('div');
document.body.appendChild(root);

window.addEventListener('message', function (event) {
    if (event.data?.type === DeviceFrameMessageType.Update) {
        const {
            data: {constructorProps, providerProps},
        } = event.data;

        ReactDOM.render(
            <PageConstructorProvider {...providerProps}>
                <PageConstructor {...constructorProps} />
            </PageConstructorProvider>,
            root,
        );
    }
});

window.parent?.postMessage({type: DeviceFrameMessageType.Ready}, window.parent.origin);

export default {};
