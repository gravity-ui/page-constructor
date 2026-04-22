import {BlockData} from '../../../../src/constructor-items';
import {Fields} from '../../../../src/form-generator-v2/types';

import SectionContainer from './SectionContainer';

const SectionContainerConfig: BlockData = {
    type: 'custom/container-section',
    component: SectionContainer,
    schema: {
        name: 'Section',
        group: 'custom/containers',
        inputs: [
            {
                type: 'section',
                title: 'Section',
                opened: true,
                fields: [
                    {type: 'textInput', name: 'title', title: 'Title'},
                    {type: 'textArea', name: 'description', title: 'Description'},
                    {
                        type: 'segmentedRadioGroup',
                        name: 'background',
                        title: 'Background',
                        options: [{value: 'none', content: 'None'}, {value: 'subtle', content: 'Subtle'}, {value: 'brand', content: 'Brand'}],
                        defaultValue: 'none',
                    },
                    {type: 'switch', name: 'withDivider', title: 'Show divider'},
                ],
            },
        ] as Fields,
        default: {
            title: 'Section Title',
            description: 'Optional section description.',
            background: 'none',
            withDivider: false,
            children: [],
        },
    },
};

export default SectionContainerConfig;
