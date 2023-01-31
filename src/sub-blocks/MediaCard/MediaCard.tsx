import React from 'react';
import {MediaCardProps} from '../../models';

import {block} from '../../utils';
import {Media, CardBase} from '../../components';
import FullScreenMedia from '../../components/FullscreenMedia/FullScreenMedia';

import './MediaCard.scss';

const b = block('MediaCard');

const isFullscreenMode = ({fullScreen, dataLens, image}: MediaCardProps) => {
    // datalens and slider media card don't support fullscreen
    return fullScreen && !(dataLens || Array.isArray(image));
};
const MediaCard = ({border, ...mediaProps}: MediaCardProps) => {
    return (
        <CardBase className={b()} bodyClassName={b('body')} border={border}>
            <CardBase.Content>
                {isFullscreenMode(mediaProps) ? (
                    <FullScreenMedia>
                        {(fullScreenMediaProps = {}) => (
                            <Media {...mediaProps} {...fullScreenMediaProps} />
                        )}
                    </FullScreenMedia>
                ) : (
                    <Media {...mediaProps} />
                )}
            </CardBase.Content>
        </CardBase>
    );
};

export default MediaCard;
