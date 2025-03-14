import * as React from 'react';

import {Stop} from '@gravity-ui/icons';

import {usePostMessageAPIListener} from '../../../common/postMessage';
import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {IframeContext} from '../../context/iframeContext';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';

import './BigOverlay.scss';

const b = block('big-overlay');

interface BigOverlayProps extends ClassNameProps {}

const BigOverlay: React.FC<BigOverlayProps> = ({className}) => {
    const {zoom, manipulateOverlayMode} = useMainEditorStore();
    const {iframeElement} = useContext(IframeContext);
    const [mousePosition, setMousePosition] = useState<{x: number; y: number} | undefined>(
        undefined,
    );
    const [source, setSource] = useState<'main' | 'iframe'>('main');

    const onMouseUp = useCallback(() => {
        setMousePosition(undefined);
    }, []);

    const onIframeMouseEvent = useCallback((position: {x: number; y: number}) => {
        setMousePosition(position);
        setSource('iframe');
    }, []);

    usePostMessageAPIListener('ON_MOUSE_UP', onMouseUp);
    usePostMessageAPIListener('ON_MOUSE_MOVE', onIframeMouseEvent);

    useEffect(() => {
        const onEditorMouseEvent = (event: MouseEvent) => {
            setMousePosition({x: event.clientX, y: event.clientY});
            setSource('main');
        };

        document.addEventListener('mousemove', onEditorMouseEvent);
        document.addEventListener('mousedown', onEditorMouseEvent);

        return () => {
            document.removeEventListener('mousemove', onEditorMouseEvent);
            document.removeEventListener('mousedown', onEditorMouseEvent);
        };
    }, []);

    const realPositions = useMemo(() => {
        if (mousePosition) {
            const {x, y} = mousePosition;
            const iframeRect = iframeElement?.getClientRects().item(0);
            if (iframeRect) {
                const zoomedX = (x * zoom) / 100;
                const zoomedY = (y * zoom) / 100;
                const newX = source === 'main' ? x : zoomedX + iframeRect.x;
                const newY = source === 'main' ? y : zoomedY + iframeRect.y;
                return {x: newX, y: newY};
            }
        }

        return undefined;
    }, [mousePosition, source, iframeElement, zoom]);

    return (
        <div className={b(null, className)}>
            {realPositions && manipulateOverlayMode ? (
                <div
                    className={b('border')}
                    style={{
                        top: realPositions.y,
                        left: realPositions.x,
                    }}
                >
                    <Stop height={20} width={20} />
                </div>
            ) : null}
        </div>
    );
};

export default BigOverlay;
