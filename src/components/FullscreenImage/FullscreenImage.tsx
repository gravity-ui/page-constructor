import React, {useState, useCallback, CSSProperties} from 'react';
import {Icon, Modal} from '@yandex-cloud/uikit';

import {block} from '../../utils';
import Image, {ImageProps} from '../Image/Image';

import closeIcon from '../../../assets/icons/preview-close.svg';
import fullScreenIcon from '../../../assets/icons/full-screen.svg';

import './FullScreenImage.scss';

export interface FullScreenImageProps extends ImageProps {
    imageClassName?: string;
    modalImageClass?: string;
    imageStyle?: CSSProperties;
}

const b = block('FullScreenImage');

const FullScreenImage: React.FunctionComponent<FullScreenImageProps> = ({
    src,
    alt,
    imageClassName,
    disableCompress,
    modalImageClass,
    imageStyle,
}) => {
    const [isOpened, setIsOpened] = useState(false);
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    const openModal = useCallback(() => setIsOpened(true), []);
    const closeModal = useCallback(() => setIsOpened(false), []);
    const showFullScreenIcon = useCallback(() => setIsMouseEnter(true), []);
    const hideFullScreenIcon = useCallback(() => setIsMouseEnter(false), []);

    return (
        <div className={b()}>
            <div
                className={b('image-wrapper')}
                onMouseEnter={showFullScreenIcon}
                onMouseLeave={hideFullScreenIcon}
            >
                <Image
                    className={b('image', imageClassName)}
                    src={src}
                    alt={alt}
                    onClick={openModal}
                    style={imageStyle}
                    disableCompress={disableCompress}
                />
                <div className={b('icon-wrapper', {visible: isMouseEnter})} onClick={openModal}>
                    <Icon data={fullScreenIcon} width={18} height={18} className={b('icon')} />
                </div>
            </div>
            {isOpened && (
                <Modal open={isOpened} onClose={closeModal} className={b('modal')}>
                    <div className={b('modal-content')}>
                        <div className={b('icon-wrapper', {visible: true})} onClick={closeModal}>
                            <Icon
                                data={closeIcon}
                                width={30}
                                height={30}
                                className={b('icon', {hover: true})}
                            />
                        </div>
                        <Image
                            className={b('modal-image', modalImageClass)}
                            src={src}
                            alt={alt}
                            disableCompress={disableCompress}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FullScreenImage;
