import React from 'react';
import {MediaCardProps} from '../../models';

import {block} from '../../utils';
import {Media, CardBase} from '../../components';

import './MediaCard.scss';

const b = block('MediaCard');

const MediaCard = ({border, ...mediaProps}: MediaCardProps) => {
    return (
        <CardBase className={b()} bodyClassName={b('body')} border={border}>
            <CardBase.Content>
                <Media {...mediaProps} />
            </CardBase.Content>
        </CardBase>
    );
};

export default MediaCard;
