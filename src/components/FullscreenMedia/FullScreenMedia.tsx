import React, {useContext, useState} from 'react';

import {Icon, Modal} from '@gravity-ui/uikit';

import {MobileContext} from '../../context/mobileContext';
import {FullScreen, PreviewClose} from '../../icons';
import {block} from '../../utils';
import {MediaAllProps} from '../Media/Media';

import './FullScreenMedia.scss';

export type ChildMediaRenderProps = Pick<
    MediaAllProps,
    'fullScreen' | 'imageClassName' | 'videoClassName' | 'youtubeClassName' | 'className'
>;

export interface FullScreenMediaProps {
    showFullScreenIcon?: boolean;
    children: (props?: ChildMediaRenderProps) => JSX.Element;
}

const b = block('full-screen-media');
const FULL_SCREEN_ICON_SIZE = 18;
const CLOSE_ICON_SIZE = 30;

const getMediaClass = (type: string) => b('modal-media', {type});

const FullScreenMedia = ({children, showFullScreenIcon = true}: FullScreenMediaProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const isMobile = useContext(MobileContext);

    const openModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpened(true);
    };
    const closeModal = () => setIsOpened(false);

    if (isMobile) {
        return children();
    }

    return (
        <div className={b()}>
            <div className={b('media-wrapper')} onClickCapture={openModal}>
                {children({className: b('inline-media')})}
                {showFullScreenIcon && (
                    <div className={b('icon-wrapper')} onClickCapture={openModal}>
                        <Icon
                            data={FullScreen}
                            width={FULL_SCREEN_ICON_SIZE}
                            height={FULL_SCREEN_ICON_SIZE}
                            className={b('icon')}
                        />
                    </div>
                )}
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
