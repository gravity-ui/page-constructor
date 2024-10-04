import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import MapBlock from './Map';
import {MapBlock as MapBlockSchema} from './schema';

const MapBlockConfig = {
    component: MapBlock,
    schema: {
        name: 'Map Block',
        inputs: generateFromAJV(MapBlockSchema['map-block'] as unknown as JSONSchemaType<{}>),
        default: {
            title: 'Map Block',
        },
    },
};

export default MapBlockConfig;
