import React, {CSSProperties, HTMLProps, useState} from 'react';

import {ChevronsExpandUpRight, Xmark} from '@gravity-ui/icons';
import {Icon, Modal} from '@gravity-ui/uikit';

import SliderBlock from '../../blocks/Slider/Slider';
import {ImageProps as ModelImageProps, SliderType} from '../../models';
import {block} from '../../utils';
import Image, {ImageProps} from '../Image/Image';
import {getMediaImage} from '../Media/Image/utils';

import {i18n} from './i18n';

import './FullscreenImage.scss';

export interface FullscreenImageProps extends ImageProps {
    imageClassName?: string;
    modalImageClass?: string;
    imageStyle?: CSSProperties;
    extraProps?: HTMLProps<HTMLDivElement>;
    sliderData?: {items: ModelImageProps[]; index: number};
}

const b = block('fullscreen-image');
const FULL_SCREEN_ICON_SIZE = 18;
const CLOSE_ICON_SIZE = 24;

const FullscreenImage = (props: FullscreenImageProps) => {
    const {
        imageClassName,
        sliderData,
        modalImageClass,
        imageStyle,
        alt = i18n('img-alt'),
        extraProps,
    } = props;
    const [isOpened, setIsOpened] = useState(false);

    const openModal = () => setIsOpened(true);
    const closeModal = () => setIsOpened(false);

    return (
        <div className={b()} {...extraProps}>
            <div className={b('image-wrapper')}>
                <Image
                    {...props}
                    alt={alt}
                    className={b('image', imageClassName)}
                    onClick={openModal}
                    style={imageStyle}
                />
                <button className={b('icon-wrapper')} onClick={openModal}>
                    <Icon
                        data={ChevronsExpandUpRight}
                        width={FULL_SCREEN_ICON_SIZE}
                        height={FULL_SCREEN_ICON_SIZE}
                        className={b('icon')}
                    />
                </button>
            </div>
            {isOpened && (
                <Modal
                    open={isOpened}
                    onClose={closeModal}
                    className={b('modal')}
                    contentClassName={b('modal-content')}
                >
                    <button
                        className={b('icon-wrapper', {visible: true})}
                        onClick={closeModal}
                        aria-label={i18n('close')}
                    >
                        <Icon
                            data={Xmark}
                            width={CLOSE_ICON_SIZE}
                            height={CLOSE_ICON_SIZE}
                            className={b('icon', {hover: true})}
                        />
                    </button>
                    {!sliderData ? (
                        <Image {...props} className={b('modal-image', modalImageClass)} />
                    ) : (
                        <div className={b('modal-slider')}>
                            <SliderBlock
                                initialIndex={sliderData.index}
                                slidesToShow={1}
                                type={SliderType.MediaCard}
                            >
                                {sliderData.items.map((item, index) => {
                                    const itemData = getMediaImage(item);
                                    return (
                                        <div key={index} className={b('modal-slider_item')}>
                                            <Image
                                                className={b('modal-slider_item-image')}
                                                {...itemData}
                                            />
                                        </div>
                                    );
                                })}
                            </SliderBlock>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
};

export default FullscreenImage;
