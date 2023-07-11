import React from 'react';

import ReactDOM from 'react-dom';

import {PageConstructor} from '../../containers/PageConstructor';

const prefix = 'PC_EDITOR_DEVICE';

export const EDITOR_FRAME_ROOT_ID = `${prefix}_FRAME_ROOT`;
export const DeviceFrameMessageType = {
    Ready: `${prefix}_MESSAGE_READY`,
    Update: `${prefix}_MESSAGE_UPDATE`,
};

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
