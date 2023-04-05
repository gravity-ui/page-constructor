import React from 'react';

import Map from '../../components/Map/Map';
import MediaBase from '../../components/MediaBase/MediaBase';
import {MapBlockProps} from '../../models';

export const MapBlock = ({map, ...props}: MapBlockProps) => (
    <MediaBase {...props}>
        <MediaBase.Card>
            <Map {...map} />
        </MediaBase.Card>
    </MediaBase>
);

export default MapBlock;
