import React from 'react';

import ReactDOM from 'react-dom';

import {PageConstructor} from '../../containers/PageConstructor';

import {DeviceFrameMessageType, EDITOR_FRAME_ROOT_ID} from './constants';

import './styles.scss';

if (window.self !== window.top && window.__isEditorDeviceFrame) {
    const root = window.document.getElementById(EDITOR_FRAME_ROOT_ID);

    window.addEventListener('message', function (event) {
        const {type, data} = event.data;

        if (type === DeviceFrameMessageType.Update) {
            ReactDOM.render(<PageConstructor {...data} />, root);
        }
    });

    window.parent?.postMessage({type: DeviceFrameMessageType.Ready}, window.parent.origin);
}

export default {};
