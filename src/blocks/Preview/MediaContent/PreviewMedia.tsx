import React from 'react';
import block, {Modifications} from 'bem-cn-lite';

import Media from '../../../components/Media/Media';
import {MediaProps} from '../../../models';

import './PreviewMedia.scss';

const b = block('preview-media-block');

interface PreviewMediaProps {
    id: number;
    media: MediaProps;
    play: boolean;
    mods: Modifications | null;
}

const PreviewMedia: React.FC<PreviewMediaProps> = (props) => {
    const {id, media, play, mods} = props;

    return (
        <div key={id} className={b('media', mods)}>
            <Media {...media} playVideo={play} />
        </div>
    );
};

export default PreviewMedia;
