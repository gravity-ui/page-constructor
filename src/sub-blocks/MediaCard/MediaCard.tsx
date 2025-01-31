import {CardBase, Media} from '../../components';
import {MediaCardProps} from '../../models';
import {block} from '../../utils';

import './MediaCard.scss';

const b = block('MediaCard');

const MediaCard = ({border, analyticsEvents, ...mediaProps}: MediaCardProps) => (
    <CardBase
        className={b()}
        bodyClassName={b('body')}
        border={border}
        analyticsEvents={analyticsEvents}
    >
        <CardBase.Content>
            <Media {...mediaProps} />
        </CardBase.Content>
    </CardBase>
);

export default MediaCard;
