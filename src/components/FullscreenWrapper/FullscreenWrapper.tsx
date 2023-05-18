import React, {ReactNode, useState} from 'react';

import {Icon, Modal} from '@gravity-ui/uikit';

import {FullScreen, PreviewClose} from '../../icons';
import {ClassNameProps} from '../../models';
import {block} from '../../utils';

import './FullscreenWrapper.scss';

export interface FullScreenWrapperProps extends ClassNameProps {
    media: ReactNode;
    fullscreenMedia: ReactNode;
}

const b = block('fullscreen-wrapper');
const FULL_SCREEN_ICON_SIZE = 18;
const CLOSE_ICON_SIZE = 30;

const FullscreenWrapper = (props: FullScreenWrapperProps) => {
    const {media, fullscreenMedia, className} = props;
    const [isOpened, setIsOpened] = useState(false);
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const openModal = () => setIsOpened(true);
    const closeModal = () => setIsOpened(false);
    const showFullScreenIcon = () => setIsMouseEnter(true);
    const hideFullScreenIcon = () => setIsMouseEnter(false);

    return (
        <div className={b(null, className)}>
            <div
                className={b('media-wrapper')}
                onMouseEnter={showFullScreenIcon}
                onMouseLeave={hideFullScreenIcon}
            >
                <div onClick={openModal}>{media}</div>
                <div className={b('icon-wrapper', {visible: isMouseEnter})} onClick={openModal}>
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
                        {fullscreenMedia}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FullscreenWrapper;
