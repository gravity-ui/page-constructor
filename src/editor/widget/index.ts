//widget bundle available after build only
//@ts-ignore
import bundle from 'widget';

import {EditorContextType} from '../context';

import {DeviceFrameMessageType} from './constants';

interface DeviceIframeParams {
    initialData?: EditorContextType;
    className?: string;
    parentCSS?: string;
}

type InitialData = EditorContextType;

export class DeviceIframe {
    iframeElement?: HTMLIFrameElement;
    private initialData?: InitialData;

    constructor(parentElement: HTMLDivElement, {className = '', initialData}: DeviceIframeParams) {
        const iframe = document.createElement('iframe');
        parentElement.appendChild(iframe);

        if (iframe.contentWindow) {
            const frameDoc = iframe.contentWindow.document;

            iframe.className = className;
            frameDoc.body.classList.add(...document.body.classList, ...className.split(' '));
            iframe.style.visibility = 'hidden';

            this.iframeElement = iframe;
            this.initialData = initialData;

            window.addEventListener('message', this.onInit.bind(this));
            this.addWidgetScript();
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

    private onInit(event: MessageEvent) {
        const {type} = event.data;

        if (type === DeviceFrameMessageType.Ready && this.initialData) {
            this.onDataUpdate(this.initialData);
        }
    }
}
