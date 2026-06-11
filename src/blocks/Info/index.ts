import InfoBlock from './Info';
import {defaultValue, form} from './form';
import icon from './icon';

const InfoBlockConfig = {
    type: '@gravity-ui/page-constructor/info-block',
    component: InfoBlock,
    schema: {
        name: 'Info Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default InfoBlockConfig;
