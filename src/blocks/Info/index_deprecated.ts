import InfoBlock from './Info';
import {defaultValue, form} from './form';
import icon from './icon';

const InfoBlockConfig = {
    type: 'info-block',
    component: InfoBlock,
    schema: {
        name: 'Info Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default InfoBlockConfig;
