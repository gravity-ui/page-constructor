//widget bundle available after build only
//@ts-ignore
import bundle from 'widget';

import {EditorContextType} from '../context';
import {DeviceEmulationSettings} from '../types';

import {DeviceFrameMessageType} from './constants';
import {getHostStyles} from './utils';

interface DeviceIframeParams {
    initialData?: EditorContextType;
    className?: string;
    settings?: DeviceEmulationSettings;
}

type InitialData = EditorContextType;

export class DeviceIframe {
    iframeElement?: HTMLIFrameElement;
    private initialData?: DeviceIframeParams['initialData'];
    private settings?: DeviceIframeParams['settings'];

    constructor(
        parentElement: HTMLDivElement,
        {className = '', initialData, settings}: DeviceIframeParams,
    ) {
        const iframe = document.createElement('iframe');
        parentElement.appendChild(iframe);

        if (iframe.contentWindow) {
            const frameDoc = iframe.contentWindow.document;

            iframe.className = className;
            frameDoc.body.classList.add(...document.body.classList, ...className.split(' '));
            iframe.style.visibility = 'hidden';

            this.iframeElement = iframe;
            this.initialData = initialData;
            this.settings = settings;

            window.addEventListener('message', this.onInit.bind(this));

            this.addWidgetScript();
            this.addCustomStyles();
        }
    }

    onDataUpdate(data: InitialData) {
        this.iframeElement?.contentWindow?.postMessage(
            {
                type: DeviceFrameMessageType.Update,
                data,
            },
            window.origin,
        );
    }

    onActivenessUpdate(active: boolean) {
        if (this.iframeElement) {
            this.iframeElement.style.visibility = active ? 'visible' : 'hidden';
        }
    }

    destroy() {
        window.removeEventListener('message', this.onInit.bind(this));
    }

    private addWidgetScript() {
        const frameDoc = this.iframeElement?.contentWindow?.document;

        if (frameDoc) {
            const head = frameDoc?.getElementsByTagName('head')[0];
            const script = frameDoc.createElement('script');

            script.appendChild(document.createTextNode(bundle));
            head.appendChild(script);
        }
    }

    private addCustomStyles() {
        const {applyHostStyles, customStyles} = this.settings || {};
        const frameDoc = this.iframeElement?.contentWindow?.document;

        if (frameDoc) {
            const head = frameDoc?.getElementsByTagName('head')[0];
            let styles = applyHostStyles ? getHostStyles() : '';

            if (customStyles) {
                styles += `\n${customStyles}`;
            }

            if (styles) {
                const style = frameDoc.createElement('style');

                style.appendChild(document.createTextNode(styles));
                head.appendChild(style);
            }
        }
    }

    private onInit(event: MessageEvent) {
        const {type} = event.data;

        if (type === DeviceFrameMessageType.Ready && this.initialData) {
            this.onDataUpdate(this.initialData);
        }
    }
}
