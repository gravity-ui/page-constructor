import React, {useContext, useState} from 'react';

import Media from '../../components/Media/Media';
import MediaBase from '../../components/MediaBase/MediaBase';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
import {MediaBlockProps} from '../../models';
import {getThemedValue} from '../../utils';

export const MediaBlock = (props: MediaBlockProps) => {
    const {media} = props;

    const [play, setPlay] = useState<boolean>(false);
    const {themeValue: theme} = useContext(ThemeValueContext);
    const mediaThemed = getThemedValue(media, theme);

    return (
        <MediaBase {...props} onScroll={() => setPlay(true)}>
            <MediaBase.Card>
                <Media {...mediaThemed} playVideo={play} />
            </MediaBase.Card>
        </MediaBase>
    );
};

export default MediaBlock;
