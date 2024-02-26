import React, {useContext, useState} from 'react';

import {ChevronsExpandUpRight, Xmark} from '@gravity-ui/icons';
import {Button, Icon, Modal} from '@gravity-ui/uikit';

import {MobileContext} from '../../context/mobileContext';
import {block} from '../../utils';
import {MediaAllProps} from '../Media/Media';

import './FullscreenMedia.scss';

export type ChildMediaRenderProps = Pick<
    MediaAllProps,
    | 'fullscreen'
    | 'imageClassName'
    | 'videoClassName'
    | 'youtubeClassName'
    | 'className'
    | 'previewImg'
    | 'autoplay'
>;

export interface FullscreenMediaProps {
    showFullscreenIcon?: boolean;
    children: (props?: ChildMediaRenderProps) => JSX.Element;
}

const b = block('full-screen-media');
const FULL_SCREEN_ICON_SIZE = 18;
const CLOSE_ICON_SIZE = 24;

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
                    <Button
                        className={b('icon-wrapper')}
                        extraProps={{onClickCapture: openModal}}
                        size={'l'}
                    >
                        <Icon
                            data={ChevronsExpandUpRight}
                            width={FULL_SCREEN_ICON_SIZE}
                            height={FULL_SCREEN_ICON_SIZE}
                            className={b('icon')}
                        />
                    </Button>
                )}
            </div>
            {isOpened && (
                <Modal open={isOpened} onClose={closeModal} className={b('modal')}>
                    <div className={b('modal-content')}>
                        <Button
                            className={b('icon-wrapper', {visible: true})}
                            onClick={closeModal}
                            size={'l'}
                        >
                            <Icon
                                data={Xmark}
                                width={CLOSE_ICON_SIZE}
                                height={CLOSE_ICON_SIZE}
                                className={b('icon', {hover: true})}
                            />
                        </Button>
                        {children({
                            imageClassName: getMediaClass('image'),
                            videoClassName: getMediaClass('video'),
                            youtubeClassName: getMediaClass('youtube'),
                            fullscreen: true,
                            previewImg: undefined,
                            autoplay: true,
                        })}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FullscreenMedia;
