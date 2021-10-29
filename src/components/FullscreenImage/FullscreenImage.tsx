import React, {useState, useCallback, CSSProperties} from 'react';
import {block} from '../../utils';
import {Icon, Modal} from '@yandex-data-ui/common';
import closeIcon from '@yandex-data-ui/common/assets/icons/preview-close.svg';
import Image from '../Image/Image';

import './FullScreenImage.scss';

export interface FullScreenImageProps {
    src: string;
    alt?: string;
    imageClassName?: string;
    modalImageClass?: string;
    imageStyle?: CSSProperties;
}

const b = block('FullScreenImage');

const FullScreenImage: React.FunctionComponent<FullScreenImageProps> = ({
    src,
    alt,
    imageClassName,
    modalImageClass,
    imageStyle,
}) => {
    const [isOpened, setIsOpened] = useState(false);
    const openModal = useCallback(() => setIsOpened(true), []);
    const closeModal = useCallback(() => setIsOpened(false), []);

    return (
        <div className={b()}>
            <Image
                className={b('image', imageClassName)}
                src={src}
                alt={alt}
                onClick={openModal}
                style={imageStyle}
            />
            {isOpened && (
                <Modal open={isOpened} onClose={closeModal} className={b('modal')}>
                    <div className={b('modal-content')}>
                        <div className={b('close-button')} onClick={closeModal}>
                            <Icon data={closeIcon} width={30} height={30} className={b('icon')} />
                        </div>
                        <Image className={b('modal-image', modalImageClass)} src={src} alt={alt} />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FullScreenImage;
