import Map from '../../components/Map/Map';
import MediaBase from '../../components/MediaBase/MediaBase';
import {MapBlockProps, MapProps} from '../../models';
import {block} from '../../utils';
import {getMediaBorder} from '../../utils/borderSelector';

import './Map.scss';

const b = block('map-block');

export const MapBlock = ({map, border, disableShadow, ...props}: MapBlockProps) => {
    const borderSelected = getMediaBorder({
        border,
        disableShadow,
    });

    return (
        <MediaBase {...props}>
            <MediaBase.Card>
                <Map {...(map as MapProps)} className={b({border: borderSelected})} />
            </MediaBase.Card>
        </MediaBase>
    );
};

export default MapBlock;
