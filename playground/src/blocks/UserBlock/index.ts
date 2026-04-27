import {BlockData} from '../../../../src/constructor-items';
import {Fields} from '../../../../src/form-generator-v2/types';

import UserBlock from './UserBlock';

const UserBlockConfig: BlockData = {
    type: 'custom/atom-user',
    component: UserBlock,
    schema: {
        name: 'User',
        group: 'custom/atoms',
        inputs: [
            {
                type: 'section',
                title: 'User',
                opened: true,
                fields: [
                    {type: 'textInput', name: 'name', title: 'Name'},
                    {type: 'textInput', name: 'description', title: 'Description'},
                    {type: 'textInput', name: 'imgUrl', title: 'Avatar image URL'},
                    {
                        type: 'segmentedRadioGroup',
                        name: 'size',
                        title: 'Size',
                        options: [
                            {value: '3xs', content: '3XS'},
                            {value: '2xs', content: '2XS'},
                            {value: 'xs', content: 'XS'},
                            {value: 's', content: 'S'},
                            {value: 'm', content: 'M'},
                            {value: 'l', content: 'L'},
                            {value: 'xl', content: 'XL'},
                        ],
                        defaultValue: 'm',
                    },
                ],
            },
        ] as Fields,
        default: {
            name: 'Alice Johnson',
            description: 'Frontend Developer',
            size: 'm',
        },
    },
};

export default UserBlockConfig;
