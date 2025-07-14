import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import IconsBlock from './Icons';
import {IconsProps} from './schema';

const IconsBlockConfig = {
    component: IconsBlock,
    schema: {
        name: 'Icons Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: generateFromAJV(IconsProps as unknown as JSONSchemaType<{}>),
        default: {
            type: 'icons-block',
            title: 'Icons Block',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            size: 'm',
            items: [
                {
                    url: '/security/standards/software-registry',
                    text: 'Государственные реестры РФ',
                    src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/main-shield/security-software-registry.svg',
                },
                {
                    url: '/security/standards/gdpr',
                    text: 'Общий регламент защиты данных (GDPR)',
                    src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/main-shield/security-gdpr.svg',
                },
                {
                    url: '/security/standards/cloud-security-alliance',
                    text: 'Cloud Security Alliance',
                    src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/main-shield/security-csa.svg',
                },
                {
                    url: '/security/standards/iso-standards',
                    text: 'Международная организация по стандартизации (ISO)',
                    src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/main-shield/security-iso.svg',
                },
                {
                    url: '/security/standards/152-fz',
                    text: '№152-ФЗ «О персональных данных»',
                    src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/main-shield/security-152-fz.svg',
                },
                {
                    url: '/security/standards/gost-p-57580',
                    text: 'ГОСТ Р 57580',
                    src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/main-shield/security-gost.svg',
                },
                {
                    url: '/security/standards/pci',
                    text: 'Payment Card Industry Data Security Standard',
                    src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/main-shield/security-pci.svg',
                },
                {
                    url: '/docs/security/standard/all',
                    text: 'Стандарт по защите облачной инфраструктуры',
                    src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/icons/security_yc.svg',
                },
            ],
        },
    },
};

export default IconsBlockConfig;
