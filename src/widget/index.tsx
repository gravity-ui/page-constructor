import React from 'react';

import ReactDOM from 'react-dom';

import {PageConstructor} from '../containers/PageConstructor';
import {DeviceFrameMessageType} from '../editor/widget/constants';

import './styles.scss';

if (window.self !== window.top && window.__isEditorDeviceFrame) {
    const root = document.createElement('div');
    document.body.appendChild(root);

    window.addEventListener('message', function (event) {
        const {type, data} = event.data;

        if (type === DeviceFrameMessageType.Update) {
            ReactDOM.render(<PageConstructor {...data} />, root);
        }
    });

    window.parent?.postMessage({type: DeviceFrameMessageType.Ready}, window.parent.origin);
}

export default {};
