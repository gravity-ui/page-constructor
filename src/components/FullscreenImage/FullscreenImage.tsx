import React, {CSSProperties, useState} from 'react';

import {Icon, Modal} from '@gravity-ui/uikit';

import {Fullscreen, PreviewClose} from '../../icons';
import {block} from '../../utils';
import Image, {ImageProps} from '../Image/Image';

import i18n from './i18n';

import './FullscreenImage.scss';

export interface FullscreenImageProps extends ImageProps {
    imageClassName?: string;
    modalImageClass?: string;
    imageStyle?: CSSProperties;
}

const b = block('fullscreen-image');
const FULL_SCREEN_ICON_SIZE = 18;
const CLOSE_ICON_SIZE = 30;

const FullscreenImage = (props: FullscreenImageProps) => {
    const {imageClassName, modalImageClass, imageStyle, alt = i18n('img-alt')} = props;
    const [isOpened, setIsOpened] = useState(false);
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    const openModal = () => setIsOpened(true);
    const closeModal = () => setIsOpened(false);
    const showFullscreenIcon = () => setIsMouseEnter(true);
    const hideFullscreenIcon = () => setIsMouseEnter(false);

    return (
        <div className={b()}>
            <div
                className={b('image-wrapper')}
                onMouseEnter={showFullscreenIcon}
                onMouseLeave={hideFullscreenIcon}
            >
                <Image
                    {...props}
                    alt={alt}
                    className={b('image', imageClassName)}
                    onClick={openModal}
                    style={imageStyle}
                />
                <button
                    className={b('icon-wrapper', {visible: isMouseEnter})}
                    onClick={openModal}
                    onFocus={showFullscreenIcon}
                    onBlur={hideFullscreenIcon}
                >
                    <Icon
                        data={Fullscreen}
                        width={FULL_SCREEN_ICON_SIZE}
                        height={FULL_SCREEN_ICON_SIZE}
                        className={b('icon')}
                    />
                </button>
            </div>
            {isOpened && (
                <Modal open={isOpened} onClose={closeModal} className={b('modal')}>
                    <div className={b('modal-content')}>
                        <button
                            className={b('icon-wrapper', {visible: true})}
                            onClick={closeModal}
                            aria-label={i18n('close')}
                        >
                            <Icon
                                data={PreviewClose}
                                width={CLOSE_ICON_SIZE}
                                height={CLOSE_ICON_SIZE}
                                className={b('icon', {hover: true})}
                            />
                        </button>
                        <Image {...props} className={b('modal-image', modalImageClass)} />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FullscreenImage;
