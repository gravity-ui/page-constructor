import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import MapBlock from './Map';
import {MapBlock as MapBlockSchema} from './schema';

const MapBlockConfig = {
    type: '@gravity-ui/page-constructor/map-block',
    component: MapBlock,
    schema: {
        name: 'Map Block',
        group: '@gravity-ui/page-constructor/Blocks',
        // TODO: change to custom block schema
        inputs: generateFromAJV(MapBlockSchema['map-block'] as unknown as JSONSchemaType<{}>),
        default: {
            title: 'Map Block',
        },
    },
};

export default MapBlockConfig;
