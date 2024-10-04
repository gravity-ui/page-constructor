import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import InfoBlock from './Info';
import {InfoBlock as InfoBlockSchema} from './schema';

const InfoBlockConfig = {
    component: InfoBlock,
    schema: {
        name: 'Info Block',
        inputs: generateFromAJV(InfoBlockSchema['info-block'] as unknown as JSONSchemaType<{}>),
        default: {
            type: 'info-block',
            title: 'Info Block',
            backgroundColor: '#1c1c1c',
            sectionsTitle: 'Other links',
            links: [
                {
                    text: 'Link 1',
                },
                {
                    text: 'Link 2',
                },
                {
                    text: 'Link 3',
                },
            ],
            buttons: [
                {
                    text: 'Read more',
                    theme: 'outlined-contrast',
                },
                {
                    text: 'Go back',
                    theme: 'action',
                },
            ],
        },
    },
};

export default InfoBlockConfig;
