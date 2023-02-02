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
const CONTENT_SIZE = 's';

const MediaCard = ({border, fullScreen, metaInfo, content, ...mediaProps}: MediaCardProps) => (
    <div className={b({hasContent: Boolean(content || metaInfo)})}>
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
        {metaInfo && (
            <div className={b('meta-info')}>
                {metaInfo.map((metaInfoItem) => (
                    <div key={metaInfoItem} className={b('meta-info-item')}>
                        {metaInfoItem}
                    </div>
                ))}
            </div>
        )}
        {content && (
            <Content
                size={CONTENT_SIZE}
                className={b('content')}
                colSizes={{all: 12, md: 12}}
                {...content}
            />
        )}
    </div>
);

export default MediaCard;
