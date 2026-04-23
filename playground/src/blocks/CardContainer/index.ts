import {BlockData} from '../../../../src/constructor-items';
import {Fields} from '../../../../src/form-generator-v2/types';

import CardContainer from './CardContainer';

const CardContainerConfig: BlockData = {
    type: 'custom/container-card',
    component: CardContainer,
    schema: {
        name: 'Card',
        group: 'custom/containers',
        inputs: [
            {
                type: 'section',
                title: 'Card',
                opened: true,
                fields: [
                    {type: 'textInput', name: 'title', title: 'Title'},
                    {type: 'textArea', name: 'description', title: 'Description'},
                    {
                        type: 'segmentedRadioGroup',
                        name: 'theme',
                        title: 'Theme',
                        options: [
                            {value: 'normal', content: 'Normal'},
                            {value: 'info', content: 'Info'},
                            {value: 'success', content: 'Success'},
                            {value: 'warning', content: 'Warning'},
                            {value: 'danger', content: 'Danger'},
                        ],
                        defaultValue: 'normal',
                    },
                    {
                        type: 'segmentedRadioGroup',
                        name: 'view',
                        title: 'View',
                        options: [
                            {value: 'outlined', content: 'Outlined'},
                            {value: 'filled', content: 'Filled'},
                            {value: 'raised', content: 'Raised'},
                        ],
                        defaultValue: 'outlined',
                    },
                    {
                        type: 'segmentedRadioGroup',
                        name: 'size',
                        title: 'Size',
                        options: [
                            {value: 'm', content: 'M'},
                            {value: 'l', content: 'L'},
                        ],
                        defaultValue: 'l',
                    },
                ],
            },
        ] as Fields,
        default: {
            title: 'Card Title',
            description: 'Optional card description.',
            theme: 'normal',
            view: 'outlined',
            size: 'l',
            children: [],
        },
    },
};

export default CardContainerConfig;
