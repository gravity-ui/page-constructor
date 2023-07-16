import {PageConstructorProps} from '../../../containers/PageConstructor';
import {DeviceFrameMessageType, EDITOR_FRAME_ROOT_ID} from '../../iframe/constants';
import {iframeSource} from '../../iframe/source';

interface DeviceIframeParams {
    initialData?: PageConstructorProps;
    className?: string;
    parentCSS?: string;
}

export class DeviceIframe {
    iframeElement?: HTMLIFrameElement;
    private initialData?: PageConstructorProps;

    constructor(parentElement: HTMLDivElement, {className = '', initialData}: DeviceIframeParams) {
        const iframe = document.createElement('iframe');
        parentElement.appendChild(iframe);

        if (iframe.contentWindow) {
            iframe.className = className;
            iframe.contentWindow.__isEditorDeviceFrame = true;

            const frameDoc = iframe.contentWindow.document;

            frameDoc.body.classList.add(...document.body.classList, ...className.split(' '));
            iframe.style.visibility = 'hidden';

            this.iframeElement = iframe;
            this.initialData = initialData;

            this.addFrameDocumentRoot();

            window.addEventListener('message', this.onInit.bind(this));
            this.copyResouresToChildFrame();
        }
    }

    onDataUpdate(data: PageConstructorProps) {
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

    private addFrameDocumentRoot() {
        const frameDoc = this.iframeElement?.contentWindow?.document;

        if (frameDoc) {
            const root = frameDoc.createElement('div');

            root.setAttribute('id', EDITOR_FRAME_ROOT_ID);
            frameDoc.body.appendChild(root);
        }
    }

    private copyResouresToChildFrame() {
        const frameDoc = this.iframeElement?.contentWindow?.document;

        if (frameDoc) {
            const head = frameDoc?.getElementsByTagName('head')[0];
            const script = frameDoc.createElement('script');

            script.appendChild(document.createTextNode(iframeSource));
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
