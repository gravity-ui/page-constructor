import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';
import {svgToDataUri} from '../../utils/svg';

import CardLayout from './CardLayout';
import {CardLayoutProps} from './schema';

const icon = svgToDataUri(
    `<svg width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="100" height="50" rx="7.81395" fill="white"/>
<rect x="8.93024" y="10.2906" width="25.8915" height="29.4186" rx="3.34884" fill="#C0C8DB"/>
<rect x="8.93024" y="10.2906" width="25.8915" height="14.5116" rx="3.34884" fill="#262626"/>
<rect x="12.2791" y="28.593" width="19.1938" height="2" rx="0.55814" fill="#262626"/>
<rect x="12.2791" y="31.7094" width="9" height="2" rx="0.55814" fill="#262626"/>
<rect x="37.0543" y="10.2906" width="25.8915" height="29.4186" rx="3.34884" fill="#C0C8DB"/>
<rect x="37.0543" y="10.2906" width="25.8915" height="14.5116" rx="3.34884" fill="#262626"/>
<rect x="40.4031" y="28.593" width="19.1938" height="2" rx="0.55814" fill="#262626"/>
<rect x="40.4031" y="31.7094" width="10" height="2" rx="0.55814" fill="#262626"/>
<rect x="65.1783" y="10.2906" width="25.8915" height="29.4186" rx="3.34884" fill="#C0C8DB"/>
<rect x="65.1783" y="10.2906" width="25.8915" height="14.5116" rx="3.34884" fill="#262626"/>
<rect x="68.5271" y="28.593" width="19.1938" height="2" rx="0.55814" fill="#262626"/>
<rect x="68.5271" y="31.7094" width="9" height="2" rx="0.55814" fill="#262626"/>
</svg>`,
);

const CardLayoutBlockConfig: BlockData = {
    type: 'card-layout-block',
    component: CardLayout,
    schema: {
        name: 'Card Layout Block',
        group: '@gravity-ui/page-constructor/CardContainers',
        // TODO: change to custom block schema
        inputs: generateFormFieldsFromAjvSchema(CardLayoutProps as unknown as JSONSchemaType<{}>),
        default: {
            type: 'card-layout-block',
            children: [
                {
                    type: 'background-card',
                    title: 'Tell a story and build a narrative',
                    text: 'We are all storytellers. Stories are a powerful way to communicate ideas and share information. The right story can lead to a better understanding of a situation, make us laugh, or even inspire us to do something in the future.',
                },
                {
                    type: 'background-card',
                    title: 'Tell a story and build a narrative',
                    text: 'We are all storytellers. Stories are a powerful way to communicate ideas and share information. The right story can lead to a better understanding of a situation, make us laugh, or even inspire us to do something in the future.',
                },
                {
                    type: 'background-card',
                    title: 'Tell a story and build a narrative',
                    text: 'We are all storytellers. Stories are a powerful way to communicate ideas and share information. The right story can lead to a better understanding of a situation, make us laugh, or even inspire us to do something in the future.',
                },
            ],
            title: 'Card Layout Block',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        previewImg: icon,
    },
};

export default CardLayoutBlockConfig;
