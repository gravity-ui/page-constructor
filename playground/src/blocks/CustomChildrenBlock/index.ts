import {BlockData} from '../../../../src/constructor-items';

import CustomChildrenBlock from './CustomChildrenBlock';

const CustomChildrenBlockConfig: BlockData = {
    type: 'custom/custom-children-block',
    component: CustomChildrenBlock,
    schema: {
        name: 'Custom Children Block',
        group: 'custom',
        inputs: [
            {type: 'textInput', name: 'title', title: 'Title'},
            {type: 'textArea', name: 'description', title: 'Description'},
        ],
        default: {
            title: 'Card Title',
            description: 'Card description text goes here.',
        },
    },
};

export default CustomChildrenBlockConfig;
