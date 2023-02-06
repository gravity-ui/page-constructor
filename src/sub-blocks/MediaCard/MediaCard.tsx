import React from 'react';
import {MediaCardProps} from '../../models';

import {block} from '../../utils';
import {Media, CardBase, MetaInfo, FullScreenMedia} from '../../components';
import Content from '../Content/Content';

import './MediaCard.scss';

const b = block('MediaCard');

const hasFullScreen = ({dataLens, image}: MediaCardProps) => {
    // datalens and slider media card don't support fullscrPcareen
    return !(dataLens || Array.isArray(image));
};
const CONTENT_SIZE = 's';

const MediaCard = ({border, fullScreen, metaInfo, content, ...mediaProps}: MediaCardProps) => (
    <div className={b({hasContent: Boolean(content || metaInfo)})}>
        <CardBase className={b('card', {fullScreen})} bodyClassName={b('body')} border={border}>
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
        {metaInfo && <MetaInfo items={metaInfo} />}
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
