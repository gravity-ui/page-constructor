import {testCustomClassName} from '../../../../test-utils/shared/common';
import {
    testContentByDefault,
    testContentWithAdditionalInfo,
    testContentWithButtons,
    testContentWithCentered,
    testContentWithColSize,
    testContentWithLinks,
    testContentWithList,
    testContentWithSize,
    testContentWithText,
    testContentWithTheme,
    testContentWithTitle,
} from '../../../../test-utils/shared/content';
import {GridColumnSizesType} from '../../../grid/types';
import {ContentSize, ContentTheme} from '../../../models/constructor-items/common';
import {getCommonQa} from '../../../utils/blocks';
import Content, {ContentProps} from '../Content';

const contentData: ContentProps = {
    title: 'title',
    text: 'text',
    additionalInfo: 'additional info',
    links: [{url: 'https://example.com', theme: 'normal'}],
    buttons: [{url: 'https://example.com', text: 'button'}],
    centered: true,
    list: [
        {
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img-gray.png',
            title: 'list title',
            text: 'list text',
        },
    ],
    qa: 'content',
};

const colSizesArray: GridColumnSizesType[] = [
    {all: 9, lg: 8, md: 7, sm: 6},
    {all: 5, lg: 4, md: 3, sm: 2},
];

const qas = getCommonQa(contentData.qa, ['link', 'list']);

describe('Content', () => {
    test('Render by default', async () => {
        testContentByDefault({
            component: Content,
            props: contentData,
            options: {qaId: qas.container},
        });
    });

    test('Render with title', async () => {
        testContentWithTitle({
            component: Content,
            props: contentData,
            options: {},
        });
    });

    test('Render with text', async () => {
        testContentWithText({
            component: Content,
            props: contentData,
            options: {},
        });
    });

    test('Render with additionalInfo', async () => {
        testContentWithAdditionalInfo({
            component: Content,
            props: contentData,
            options: {},
        });
    });

    test.each(new Array<ContentSize>('s', 'l'))('Render with given "%s" size', (size) => {
        testContentWithSize({
            component: Content,
            props: {...contentData, size},
            options: {qaId: qas.container},
        });
    });

    test('Render with links', async () => {
        const linkQa = getCommonQa(qas.link, ['normal']);
        testContentWithLinks({
            component: Content,
            props: contentData,
            options: {qaId: linkQa.normal},
        });
    });

    test('Render with buttons', async () => {
        testContentWithButtons({
            component: Content,
            props: contentData,
            options: {qaId: qas.button},
        });
    });

    test.each(new Array<GridColumnSizesType>(...colSizesArray))(
        'Render with given "%s" colSizes',
        (colSizes) => {
            testContentWithColSize({
                component: Content,
                props: {...contentData, colSizes},
                options: {qaId: qas.container},
            });
        },
    );

    test('Render with centered', async () => {
        testContentWithCentered({
            component: Content,
            props: contentData,
            options: {qaId: qas.container},
        });
    });

    test.each(new Array<ContentTheme>('default', 'dark', 'light'))(
        'Render with given "%s" theme',
        (theme) => {
            testContentWithTheme({
                component: Content,
                props: {...contentData, theme},
                options: {qaId: qas.container},
            });
        },
    );

    test('Render with custom class', async () => {
        testCustomClassName<ContentProps>({
            component: Content,
            props: contentData,
            options: {qaId: qas.container},
        });
    });

    test('Render with list', async () => {
        testContentWithList({
            component: Content,
            props: contentData,
            options: {qaId: qas.list},
        });
    });
});
