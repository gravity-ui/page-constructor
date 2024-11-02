import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import FilterBlock from './FilterBlock';
import {FilterProps} from './schema';

const FilterBlockConfig = {
    component: FilterBlock,
    schema: {
        name: 'Filter Block',
        group: 'block',
        inputs: generateFromAJV(FilterProps as unknown as JSONSchemaType<{}>),
        default: {
            allTag: true,
            description:
                'Three cards in a row on the desktop, two cards in a row on a tablet, one card in a row on a mobile phone.',
            items: [
                {
                    card: {
                        content: {
                            title: 'Layout Item 1',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        },
                        type: 'layout-item',
                    },
                    tags: ['one'],
                },
                {
                    card: {
                        content: {
                            title: 'Layout Item 2',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        },
                        type: 'layout-item',
                    },
                    tags: ['two'],
                },
                {
                    card: {
                        content: {
                            title: 'Layout Item 3',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        },
                        type: 'layout-item',
                    },
                    tags: ['three'],
                },
                {
                    card: {
                        content: {
                            title: 'Layout Item 4',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        },
                        type: 'layout-item',
                    },
                    tags: ['one'],
                },
                {
                    card: {
                        content: {
                            title: 'Layout Item 5',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        },
                        type: 'layout-item',
                    },
                    tags: ['two'],
                },
                {
                    card: {
                        content: {
                            title: 'Layout Item 6',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        },
                        type: 'layout-item',
                    },
                    tags: ['three'],
                },
            ],
            tags: [
                {
                    id: 'one',
                    label: 'First very long label',
                },
                {
                    id: 'two',
                    label: 'Second very long label',
                },
                {
                    id: 'three',
                    label: 'Third very long label',
                },
            ],
            title: 'Card Layout',
            type: 'filter-block',
        },
    },
};

export default FilterBlockConfig;
