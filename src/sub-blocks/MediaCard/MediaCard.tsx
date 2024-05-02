import React from 'react';

import {CardBase, Media} from '../../components';
import {useTheme} from '../../context/theme';
import {MediaCardProps, MediaProps} from '../../models';
import {block, getThemedValue} from '../../utils';

import './MediaCard.scss';

const b = block('MediaCard');

const MediaCard = ({border, analyticsEvents, ...mediaProps}: MediaCardProps) => {
    const theme = useTheme();
    const themedMedia = getThemedValue(mediaProps as MediaProps, theme);

    return (
        <CardBase
            className={b()}
            bodyClassName={b('body')}
            border={border}
            analyticsEvents={analyticsEvents}
        >
            <CardBase.Content>
                <Media {...themedMedia} />
            </CardBase.Content>
        </CardBase>
    );
};

export default MediaCard;
