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

const CUSTOM_LOADABLE_CARD_DESCRIPTION = `
**Custom loadable blocks are displayed inside other blocks based on loadable data.**

To create and use a custom loadable block you need to:
1. Create your own block component
2. Create an async \`FetchLoadableData\` function that returns props for your component
3. Give your block a name, add it and the corresponding fetch function to your \`CustomConfig\`
4. Pass this config to \`<PageConstructor />\`

Check out this Stories' \`content\` control to see page data.

Code on the other side of the card links to the current example's source.
`;

const LOADABLE_DATA: CustomCardProps = {
    title: 'Custom Loadable Card',
    url: 'https://github.com/gravity-ui/page-constructor/blob/main/src/containers/PageConstructor/__stories__/components/CustomBlocksTemplate.tsx',
    content: CUSTOM_LOADABLE_CARD_CODE,
    description: CUSTOM_LOADABLE_CARD_DESCRIPTION,
};

export const CustomLoadableCard = CustomCard;

export const loadCustomCardData = () =>
    new Promise<CustomCardProps[]>((resolve) =>
        setTimeout(() => resolve(new Array(5).fill(LOADABLE_DATA)), 10000),
    );
