import * as React from 'react';

import Media from '../../components/Media/Media';
import MediaBase from '../../components/MediaBase/MediaBase';
import {useTheme} from '../../context/theme';
import {MediaBlockProps} from '../../models';
import {block, getThemedValue} from '../../utils';
import {getMediaBorder} from '../../utils/borderSelector';
import {mergeVideoMicrodata} from '../../utils/microdata';

import './Media.scss';

const b = block('media-block');

export const MediaBlock = (props: MediaBlockProps) => {
    const {media, border, disableShadow, title, description} = props;
    const borderSelected = getMediaBorder({
        border,
        disableShadow,
    });

    const [play, setPlay] = React.useState<boolean>(false);
    const theme = useTheme();
    const mediaThemed = getThemedValue(media, theme);
    const mediaWithMicrodata = mergeVideoMicrodata(mediaThemed, {
        name: typeof title === 'object' ? title.text : title,
        description,
    });

    return (
        <MediaBase {...props} onScroll={() => setPlay(true)}>
            <MediaBase.Card>
                <Media
                    imageClassName={b('image')}
                    {...mediaWithMicrodata}
                    playVideo={play}
                    className={b({border: borderSelected})}
                />
            </MediaBase.Card>
        </MediaBase>
    );
};

export default MediaBlock;
