import React from 'react';

import {block} from '../../../utils';
import Media from '../../../components/Media/Media';
import {MediaProps, Modifiers} from '../../../models';

import './PreviewMedia.scss';

const b = block('preview-media-block');

interface PreviewMediaProps {
    id: number;
    media: MediaProps;
    play: boolean;
    mods: Modifiers | null;
}

const PreviewMedia = (props: PreviewMediaProps) => {
    const {id, media, play, mods} = props;

    return (
        <div key={id} className={b('media', mods)}>
            <Media {...media} playVideo={play} />
        </div>
    );
};

export default PreviewMedia;
