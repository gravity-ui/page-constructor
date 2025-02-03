import React, {useCallback, useContext, useState} from 'react';

import {Loader} from '@gravity-ui/uikit';

import {usePostMessageAPIListener} from '../../../common/postMessage';
import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {useMainEditorStore} from '../../context/editorStore';
import {IframeContext} from '../../context/iframeContext';
import Overlay from '../Overlay/Overlay';
import TopBar from '../TopBar/TopBar';

import './MiddleScreen.scss';

const b = block('middle-screen');

interface MiddleScreenProps extends ClassNameProps {}

const MiddleScreen: React.FC<MiddleScreenProps> = ({className}) => {
    const {zoom, initialized, setZoom, decreaseZoom, increaseZoom} = useMainEditorStore();
    const {url, setIframeElement} = useContext(IframeContext);
    const [height, setHeight] = useState(0);

    const onResize = useCallback(
        (newHeight: number) => {
            setHeight(newHeight + 500);
        },
        [setHeight],
    );

    usePostMessageAPIListener('ON_RESIZE', ({height: newHeight}) => {
        onResize(newHeight);
    });

    usePostMessageAPIListener('ON_INIT', ({height: newHeight}) => {
        onResize(newHeight);
    });

    return (
        <div className={b(null, className)}>
            <div className={b('topbar')}>
                <TopBar
                    onZoomUpdate={setZoom}
                    zoom={zoom}
                    onDecreaseZoom={decreaseZoom}
                    onIncreaseZoom={increaseZoom}
                />
            </div>
            <div className={b('wrapper')}>
                <div
                    className={b('canvas', {hidden: !initialized})}
                    style={{
                        transform: `scale(${zoom}%)`,
                        height: `${(100 / zoom) * 100}%`,
                        width: `${(100 / zoom) * 100}%`,
                    }}
                >
                    <iframe
                        ref={(instance) => instance && setIframeElement(instance)}
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
        </div>
    );
};

export default MiddleScreen;
