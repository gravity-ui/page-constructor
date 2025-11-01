import {testCustomClassName} from '../../../../test-utils/shared/common';
import {
    testContentByDefault,
    testContentWithAdditionalInfo,
    testContentWithButtons,
    testContentWithCentered,
    testContentWithColSize,
    testContentWithLabels,
    testContentWithLinks,
    testContentWithList,
    testContentWithSize,
    testContentWithText,
    testContentWithTheme,
    testContentWithTitle,
} from '../../../../test-utils/shared/content';
import {GridColumnSizesType} from '../../../grid/types';
import {ContentSize, ContentTheme} from '../../../models/constructor-items/common';
import {getQaAttrubutes} from '../../../utils/blocks';
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
            icon: '/mock.png',
            title: 'list title',
            text: 'list text',
        },
    ],
    labels: [
        {
            icon: '/mock.png',
            text: 'label text',
        },
    ],
    qa: 'content',
};

const colSizesArray: GridColumnSizesType[] = [
    {all: 9, lg: 8, md: 7, sm: 6},
    {all: 5, lg: 4, md: 3, sm: 2},
];

const qaAttributes = getQaAttrubutes(contentData.qa, ['link', 'list']);

describe('Content', () => {
    test('Render by default', async () => {
        testContentByDefault({
            props: contentData,
            options: {qaId: qaAttributes.container},
        });
    });

    test('Render with title', async () => {
        testContentWithTitle({
            props: contentData,
        });
    });

    test('Render with text', async () => {
        testContentWithText({
            props: contentData,
        });
    });

    test('Render with additionalInfo', async () => {
        testContentWithAdditionalInfo({
            props: contentData,
        });
    });

    test.each(new Array<ContentSize>('s', 'l'))('Render with given "%s" size', (size) => {
        testContentWithSize({
            props: {...contentData, size},
            options: {qaId: qaAttributes.container},
        });
    });

    test('Render with links', async () => {
        const linkQa = getQaAttrubutes(qaAttributes.link, ['normal']);
        testContentWithLinks({
            props: contentData,
            options: {qaId: linkQa.normal},
        });
    });

    test('Render with buttons', async () => {
        testContentWithButtons({
            props: contentData,
            options: {qaId: qaAttributes.button},
        });
    });

    test.each(new Array<GridColumnSizesType>(...colSizesArray))(
        'Render with given "%s" colSizes',
        (colSizes) => {
            testContentWithColSize({
                props: {...contentData, colSizes},
                options: {qaId: qaAttributes.container},
            });
        },
    );

    test('Render with centered', async () => {
        testContentWithCentered({
            props: contentData,
            options: {qaId: qaAttributes.container},
        });
    });

    test.each(new Array<ContentTheme>('default', 'dark', 'light'))(
        'Render with given "%s" theme',
        (theme) => {
            testContentWithTheme({
                props: {...contentData, theme},
                options: {qaId: qaAttributes.container},
            });
        },
    );

    test('Render with custom class', async () => {
        testCustomClassName<ContentProps>({
            component: Content,
            props: contentData,
            options: {qaId: qaAttributes.container},
        });
    });

    test('Render with list', async () => {
        testContentWithList({
            props: contentData,
            options: {qaId: qaAttributes.list},
        });
    });

    test('Render with labels', async () => {
        testContentWithLabels({
            props: contentData,
            options: {qaId: qaAttributes.labels},
        });
    });
});
