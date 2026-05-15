import QuestionsBlock from './Questions';
import {defaultValue, form} from './form';
import icon from './icon';

const QuestionsBlockConfig = {
    type: 'questions-block',
    component: QuestionsBlock,
    schema: {
        name: 'Questions Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default QuestionsBlockConfig;
