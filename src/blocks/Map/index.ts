import MapBlock from './Map';
import {defaultValue, form} from './form';

const MapBlockConfig = {
    type: '@gravity-ui/page-constructor/map-block',
    component: MapBlock,
    schema: {
        name: 'Map Block',
        group: '@gravity-ui/page-constructor/UnfinishedBlocks',
        inputs: form,
        default: defaultValue,
    },
};

export default MapBlockConfig;
