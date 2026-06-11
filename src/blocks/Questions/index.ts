import {BlockData} from '../../constructor-items';

import QuestionsBlock from './Questions';
import {defaultValue, form} from './form';
import icon from './icon';

const QuestionsBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/questions-block',
    component: QuestionsBlock,
    schema: {
        name: 'Questions Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default QuestionsBlockConfig;
