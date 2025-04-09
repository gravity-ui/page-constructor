import {Loader} from '@gravity-ui/uikit';
import * as React from 'react';

import {usePostMessageAPIListener} from '../../../common/postMessage';
import {IframeContext} from '../../context/iframeContext';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';
import Overlay from '../Overlay/Overlay';

import './MiddleScreen.scss';

const b = editorCn('middle-screen');

interface MiddleScreenProps {
    className?: string;
    CustomTop?: React.ElementType;
}

const MiddleScreen = ({className, CustomTop}: MiddleScreenProps) => {
    const {zoom, initialized, deviceWidth} = useMainEditorStore();
    const {url, setIframeElement} = React.useContext(IframeContext);
    const [canvasRef, setCanvasRef] = React.useState<HTMLDivElement | null>(null);
    const [height, setHeight] = React.useState(0);

    const onResize = React.useCallback(
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
            {CustomTop ? (
                <div className={b('topbar')}>
                    <CustomTop />
                </div>
            ) : null}
            <div className={b('content')}>
                <div className={b('wrapper')}>
                    <div
                        ref={setCanvasRef}
                        className={b('canvas', {hidden: !initialized})}
                        style={{
                            transform: `scale(${zoom}%)`,
                            height: `${(100 / zoom) * 100}%`,
                            width: deviceWidth,
                            maxWidth: `${(100 / zoom) * 100}%`,
                        }}
                    >
                        <iframe
                            ref={(instance) => instance && setIframeElement(instance)}
                            className={b('iframe')}
                            src={url}
                            height={`${height}px`}
                            width={deviceWidth}
                            frameBorder="0"
                            title="Page Constructor Iframe"
                        />
                        <Overlay className={b('overlay')} canvasElement={canvasRef} />
                        {!initialized && (
                            <div className={b('loading')}>
                                <Loader size={'l'} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiddleScreen;
