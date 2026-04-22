import {BlockData} from '../../../../src/constructor-items';
import {Fields} from '../../../../src/form-generator-v2/types';

import AvatarBlock from './AvatarBlock';

const AvatarBlockConfig: BlockData = {
    type: 'custom/atom-avatar',
    component: AvatarBlock,
    schema: {
        name: 'Avatar',
        group: 'custom/atoms',
        inputs: [
            {
                type: 'section',
                title: 'Avatar',
                opened: true,
                fields: [
                    {type: 'textInput', name: 'text', title: 'Initials / fallback text'},
                    {type: 'textInput', name: 'imgUrl', title: 'Image URL'},
                    {
                        type: 'segmentedRadioGroup',
                        name: 'size',
                        title: 'Size',
                        options: [
                            {value: 'xs', content: 'XS'},
                            {value: 's', content: 'S'},
                            {value: 'm', content: 'M'},
                            {value: 'l', content: 'L'},
                            {value: 'xl', content: 'XL'},
                            {value: '2xl', content: '2XL'},
                            {value: '3xl', content: '3XL'},
                        ],
                        defaultValue: 'xl',
                    },
                    {
                        type: 'segmentedRadioGroup',
                        name: 'theme',
                        title: 'Theme',
                        options: [{value: 'normal', content: 'Normal'}, {value: 'brand', content: 'Brand'}],
                        defaultValue: 'normal',
                    },
                    {
                        type: 'segmentedRadioGroup',
                        name: 'view',
                        title: 'View',
                        options: [{value: 'filled', content: 'Filled'}, {value: 'outlined', content: 'Outlined'}],
                        defaultValue: 'filled',
                    },
                ],
            },
        ] as Fields,
        default: {
            text: 'AJ',
            size: 'xl',
            theme: 'brand',
            view: 'filled',
        },
    },
};

export default AvatarBlockConfig;
