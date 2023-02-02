import React, {useState} from 'react';
import {Icon, Modal} from '@gravity-ui/uikit';

import {block} from '../../utils';
import {PreviewClose, FullScreen} from '../../icons';
import {MediaAllProps} from '../Media/Media';

import './FullScreenMedia.scss';

export type ChildMediaRenderProps = Pick<
    MediaAllProps,
    'fullScreen' | 'imageClassName' | 'videoClassName' | 'youtubeClassName'
>;

export interface FullScreenMediaProps {
    children: (props?: ChildMediaRenderProps) => React.ReactNode;
}

const b = block('FullScreenMedia');
const FULL_SCREEN_ICON_SIZE = 18;
const CLOSE_ICON_SIZE = 30;

const getMediaClass = (type: string) => b('modal-media', {type});

const FullScreenMedia = ({children}: FullScreenMediaProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const openModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpened(true);
    };
    const closeModal = () => setIsOpened(false);
    const showFullScreenIcon = () => setIsMouseEnter(true);
    const hideFullScreenIcon = () => setIsMouseEnter(false);

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
                    <Icon
                        data={FullScreen}
                        width={FULL_SCREEN_ICON_SIZE}
                        height={FULL_SCREEN_ICON_SIZE}
                        className={b('icon')}
                    />
                </div>
            </div>
            {isOpened && (
                <Modal open={isOpened} onClose={closeModal} className={b('modal')}>
                    <div className={b('modal-content')}>
                        <div className={b('icon-wrapper', {visible: true})} onClick={closeModal}>
                            <Icon
                                data={PreviewClose}
                                width={CLOSE_ICON_SIZE}
                                height={CLOSE_ICON_SIZE}
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
