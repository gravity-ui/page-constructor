import React, {useContext, useState} from 'react';

import {Icon, Modal} from '@gravity-ui/uikit';

import {MobileContext} from '../../context/mobileContext';
import {Fullscreen, PreviewClose} from '../../icons';
import {block} from '../../utils';
import {MediaAllProps} from '../Media/Media';

import './FullscreenMedia.scss';

export type ChildMediaRenderProps = Pick<
    MediaAllProps,
    'fullscreen' | 'imageClassName' | 'videoClassName' | 'youtubeClassName' | 'className'
>;

export interface FullscreenMediaProps {
    showFullscreenIcon?: boolean;
    children: (props?: ChildMediaRenderProps) => JSX.Element;
}

const b = block('full-screen-media');
const FULL_SCREEN_ICON_SIZE = 18;
const CLOSE_ICON_SIZE = 30;

const getMediaClass = (type: string) => b('modal-media', {type});

const FullscreenMedia = ({children, showFullscreenIcon = true}: FullscreenMediaProps) => {
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
                {showFullscreenIcon && (
                    <div className={b('icon-wrapper')} onClickCapture={openModal}>
                        <Icon
                            data={Fullscreen}
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
                            fullscreen: true,
                        })}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FullscreenMedia;
