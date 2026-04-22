import {BlockData} from '../../../../src/constructor-items';
import {Fields} from '../../../../src/form-generator-v2/types';

import BreadcrumbsBlock from './BreadcrumbsBlock';

const BreadcrumbsBlockConfig: BlockData = {
    type: 'custom/atom-breadcrumbs',
    component: BreadcrumbsBlock,
    schema: {
        name: 'Breadcrumbs',
        group: 'custom/atoms',
        inputs: [
            {
                type: 'section',
                title: 'Items',
                withAddButton: true,
                index: 'index',
                itemTitle: 'Item {{index}}',
                itemView: 'card',
                fields: [
                    {type: 'textInput', name: 'items[{{index}}].text', title: 'Label'},
                    {type: 'textInput', name: 'items[{{index}}].href', title: 'Link URL'},
                ],
            },
        ] as Fields,
        default: {
            items: [
                {text: 'Home', href: '/'},
                {text: 'Products', href: '/products'},
                {text: 'Current page'},
            ],
        },
    },
};

export default BreadcrumbsBlockConfig;
