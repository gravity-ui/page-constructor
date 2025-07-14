import {Xmark} from '@gravity-ui/icons';
import {Button, Icon, Loader} from '@gravity-ui/uikit';
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
    const {zoom, initialized, deviceWidth, isPreviewMode, togglePreviewMode} = useMainEditorStore();
    const {url, setIframeElement} = React.useContext(IframeContext);
    const [canvasRef, setCanvasRef] = React.useState<HTMLDivElement | null>(null);
    const [height, setHeight] = React.useState(0);

    const canvasStyle = React.useMemo(
        () => ({
            transform: isPreviewMode ? 'none' : `scale(${zoom}%)`,
            height: isPreviewMode ? '100%' : `${(100 / zoom) * 100}%`,
            width: isPreviewMode ? '100%' : `${(100 / zoom) * 100}%`,
            maxWidth: isPreviewMode ? '100%' : `${(100 / zoom) * 100}%`,
        }),
        [isPreviewMode, zoom, deviceWidth],
    );

    const onResize = React.useCallback(
        (newHeight: number) => {
            setHeight(newHeight + 100);
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
            {CustomTop && !isPreviewMode ? (
                <div className={b('topbar')}>
                    <CustomTop />
                </div>
            ) : null}
            <div className={b('content', {fullscreen: isPreviewMode})}>
                <div className={b('wrapper')}>
                    <div
                        ref={setCanvasRef}
                        className={b('canvas', {hidden: !initialized, fullscreen: isPreviewMode})}
                        style={canvasStyle}
                    >
                        <iframe
                            ref={(instance) => {
                                if (instance) {
                                    setIframeElement(instance);
                                }
                            }}
                            className={b('iframe', {fullscreen: isPreviewMode})}
                            src={url}
                            height={isPreviewMode ? '100%' : `${height}px`}
                            width={isPreviewMode ? '100%' : deviceWidth}
                            frameBorder="0"
                            title="Page Constructor Iframe"
                        />
                        {!isPreviewMode && (
                            <Overlay className={b('overlay')} canvasElement={canvasRef} />
                        )}
                        {isPreviewMode && (
                            <Button
                                view="action"
                                className={b('exit-preview')}
                                onClick={togglePreviewMode}
                                aria-label="Exit preview mode"
                                title="Exit preview mode"
                                size="l"
                            >
                                <Icon size={24} data={Xmark} />
                            </Button>
                        )}
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
