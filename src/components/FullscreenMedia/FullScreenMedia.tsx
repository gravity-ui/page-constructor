import React, {useState, useCallback} from 'react';
import {Icon, Modal} from '@gravity-ui/uikit';

import {block} from '../../utils';
import {PreviewClose, FullScreen} from '../../icons';

import './FullScreenMedia.scss';
import {MediaAllProps} from '../Media/Media';

export type ChildMediaRenderProps = Pick<
    MediaAllProps,
    'fullScreen' | 'imageClassName' | 'videoClassName' | 'youtubeClassName'
>;

export interface FullScreenMediaProps {
    children: (props?: ChildMediaRenderProps) => React.ReactNode;
}

const b = block('FullScreenMedia');

const getMediaClass = (type: string) => b('modal-media', {type});

const FullScreenMedia = ({children}: FullScreenMediaProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const openModal = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpened(true);
    }, []);
    const closeModal = useCallback(() => setIsOpened(false), []);
    const showFullScreenIcon = useCallback(() => setIsMouseEnter(true), []);
    const hideFullScreenIcon = useCallback(() => setIsMouseEnter(false), []);

    return (
        <div className={b()}>
            <div
                className={b('media-wrapper')}
                onMouseEnter={showFullScreenIcon}
                onMouseLeave={hideFullScreenIcon}
                onClickCapture={openModal}
            >
                {children()}
                <div
                    className={b('icon-wrapper', {visible: isMouseEnter})}
                    onClickCapture={openModal}
                >
                    <Icon data={FullScreen} width={18} height={18} className={b('icon')} />
                </div>
            </div>
            {isOpened && (
                <Modal open={isOpened} onClose={closeModal} className={b('modal')}>
                    <div className={b('modal-content')}>
                        <div className={b('icon-wrapper', {visible: true})} onClick={closeModal}>
                            <Icon
                                data={PreviewClose}
                                width={30}
                                height={30}
                                className={b('icon', {hover: true})}
                            />
                        </div>
                        {children({
                            imageClassName: getMediaClass('image'),
                            videoClassName: getMediaClass('video'),
                            youtubeClassName: getMediaClass('youtube'),
                            fullScreen: true,
                        })}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FullScreenMedia;
