import React, {useContext} from 'react';

import {Loader} from '@gravity-ui/uikit';

import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {useEditorStore} from '../../context/editorContext';
import {IframeContext, useIframeStore} from '../../context/iframeContext';
import Overlay from '../Overlay/Overlay';
import TopBar from '../TopBar/TopBar';

import './MiddleScreen.scss';

const b = block('middle-screen');

interface MiddleScreenProps extends ClassNameProps {}

const MiddleScreen: React.FC<MiddleScreenProps> = ({className}) => {
    const {url, height} = useIframeStore();
    const {initialized} = useEditorStore();
    const {setIframeElement} = useContext(IframeContext);

    return (
        <div className={b(null, className)}>
            <div className={b('topbar')}>
                <TopBar />
            </div>
            <div className={b('canvas', {hidden: !initialized})}>
                <iframe
                    ref={(element) => {
                        if (element) {
                            setIframeElement(element);
                        }
                    }}
                    className={b('iframe')}
                    src={url}
                    height={`${height}px`}
                    width="100%"
                    frameBorder="0"
                />
                <Overlay className={b('overlay')} />
                {!initialized && (
                    <div className={b('loading')}>
                        <Loader size={'l'} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MiddleScreen;
