import {createRoot} from 'react-dom/client';

// loading uikit styles before page constructor customisations
// eslint-disable-next-line import/order
import './styles.scss';

import {PageConstructor, PageConstructorProvider} from '../containers/PageConstructor';
import {DeviceFrameMessageType} from '../editor/widget/constants';

const root = document.createElement('div');
document.body.appendChild(root);
const reactRoot = createRoot(root);

window.addEventListener('message', function (event) {
    if (event.data?.type === DeviceFrameMessageType.Update) {
        const {
            data: {constructorProps, providerProps},
        } = event.data;

        reactRoot.render(
            <PageConstructorProvider {...providerProps}>
                <PageConstructor {...constructorProps} />
            </PageConstructorProvider>,
        );
    }
});

window.parent?.postMessage({type: DeviceFrameMessageType.Ready}, window.parent.origin);

export default {};
