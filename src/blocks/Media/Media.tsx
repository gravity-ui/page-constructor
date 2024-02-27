import React, {useState} from 'react';

import Media from '../../components/Media/Media';
import MediaBase from '../../components/MediaBase/MediaBase';
import {useTheme} from '../../context/theme';
import {MediaBlockProps} from '../../models';
import {block, getThemedValue} from '../../utils';
import {getMediaBorder} from '../../utils/borderSelector';

import './Media.scss';

const b = block('media-block');

export const MediaBlock = (props: MediaBlockProps) => {
    const {media, border, disableShadow} = props;
    const borderSelected = getMediaBorder({
        border,
        disableShadow,
    });

    const [play, setPlay] = useState<boolean>(false);
    const theme = useTheme();
    const mediaThemed = getThemedValue(media, theme);

    return (
        <MediaBase {...props} onScroll={() => setPlay(true)}>
            <MediaBase.Card>
                <Media
                    imageClassName={b('image')}
                    {...mediaThemed}
                    playVideo={play}
                    className={b({border: borderSelected})}
                />
            </MediaBase.Card>
        </MediaBase>
    );
};

export default MediaBlock;
