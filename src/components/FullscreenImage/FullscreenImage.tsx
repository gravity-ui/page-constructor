import React, {useState, useCallback, CSSProperties} from 'react';
import {Icon, Modal} from '@gravity-ui/uikit';

import {block} from '../../utils';
import Image, {ImageProps} from '../Image/Image';
import {PreviewClose, FullScreen} from '../../icons';

import './FullScreenImage.scss';

export interface FullScreenImageProps extends ImageProps {
    imageClassName?: string;
    modalImageClass?: string;
    imageStyle?: CSSProperties;
}

const b = block('FullScreenImage');

const FullScreenImage = (props: FullScreenImageProps) => {
    const {imageClassName, modalImageClass, imageStyle} = props;
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
                    {...props}
                    className={b('image', imageClassName)}
                    onClick={openModal}
                    style={imageStyle}
                />
                <div className={b('icon-wrapper', {visible: isMouseEnter})} onClick={openModal}>
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
                        <Image {...props} className={b('modal-image', modalImageClass)} />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FullScreenImage;
