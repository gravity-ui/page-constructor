import React from 'react';

import {MapBlockProps} from '../../models';
import Map from '../../components/Map/Map';
import MediaBase from '../../components/MediaBase/MediaBase';

export const MapBlock = ({map, ...props}: MapBlockProps) => (
    <MediaBase {...props}>
        <MediaBase.Card>
            <Map {...map} />
        </MediaBase.Card>
    </MediaBase>
);

export default MapBlock;
