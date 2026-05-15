import MapBlock from './Map';
import {defaultValue, form} from './form';

const MapBlockConfig = {
    type: 'map-block',
    component: MapBlock,
    schema: {
        name: 'Map Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
    },
};

export default MapBlockConfig;
