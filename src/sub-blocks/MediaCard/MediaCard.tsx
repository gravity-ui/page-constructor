import React from 'react';
import {MediaCardProps} from '../../models';

import {block} from '../../utils';
import {Media, CardBase} from '../../components';
import FullScreenMedia from '../../components/FullscreenMedia/FullScreenMedia';

import './MediaCard.scss';
import Content from '../Content/Content';

const b = block('MediaCard');

const hasFullScreen = ({dataLens, image}: MediaCardProps) => {
    // datalens and slider media card don't support fullscreen
    return !(dataLens || Array.isArray(image));
};

const MediaCard = ({border, fullScreen, content, ...mediaProps}: MediaCardProps) => (
    <div className={b()}>
        <CardBase bodyClassName={b('body')} border={border}>
            <CardBase.Content>
                {fullScreen && hasFullScreen(mediaProps) ? (
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
        {content && (
            <Content size="s" className={b('content')} colSizes={{all: 12, md: 12}} {...content} />
        )}
    </div>
);

export default MediaCard;
