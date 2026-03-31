import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import MapBlock from './Map';
import {MapBlock as MapBlockSchema} from './schema';

const MapBlockConfig = {
    type: 'map-block',
    component: MapBlock,
    schema: {
        name: 'Map Block',
        group: '@deprecated',
        hidden: true,
        inputs: generateFormFieldsFromAjvSchema(
            MapBlockSchema['map-block'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            title: 'Map Block',
        },
    },
};

export default MapBlockConfig;
