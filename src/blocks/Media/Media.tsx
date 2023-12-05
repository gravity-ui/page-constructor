import React, {useState} from 'react';

import Media from '../../components/Media/Media';
import MediaBase from '../../components/MediaBase/MediaBase';
import {useTheme} from '../../context/theme';
import {MediaBlockProps} from '../../models';
import {block, getThemedValue} from '../../utils';

import './Media.scss';

const b = block('media-block');

export const MediaBlock = (props: MediaBlockProps) => {
    const {media, border = 'shadow', disableShadow} = props;

    const mediaBaseShadow = disableShadow || border !== 'shadow';

    const [play, setPlay] = useState<boolean>(false);
    const theme = useTheme();
    const mediaThemed = getThemedValue(media, theme);

    return (
        <MediaBase {...props} onScroll={() => setPlay(true)} disableShadow={mediaBaseShadow}>
            <MediaBase.Card>
                <Media
                    {...mediaThemed}
                    playVideo={play}
                    className={b({border: disableShadow ? 'none' : border})}
                />
            </MediaBase.Card>
        </MediaBase>
    );
};

export default MediaBlock;
