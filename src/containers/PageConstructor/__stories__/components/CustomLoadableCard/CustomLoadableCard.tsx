import {CustomCard, CustomCardProps} from '../CustomCard';

const CUSTOM_LOADABLE_CARD_CODE = `
const CustomLoadableCard = ...;
const loadCustomCardData = ...;

const customConfig: CustomConfig = {
    ...
    loadable: {
        ['custom-loadable-card']: {
            fetch: loadCustomCardData,
            component: CustomLoadableCard,
        }
    },
};

...

<PageConstructor {...props} custom={customConfig} />
`
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const LOADABLE_DATA: CustomCardProps = {
    title: 'CustomLoadableCard',
    url: 'https://github.com/gravity-ui/page-constructor/blob/main/src/containers/PageConstructor/__stories__/components/CustomBlocksTemplate.tsx',
    content: CUSTOM_LOADABLE_CARD_CODE,
};

export const CustomLoadableCard = CustomCard;

export const loadCustomCardData = () =>
    new Promise<CustomCardProps[]>((resolve) =>
        setTimeout(() => resolve(new Array(5).fill(LOADABLE_DATA)), 10000),
    );
