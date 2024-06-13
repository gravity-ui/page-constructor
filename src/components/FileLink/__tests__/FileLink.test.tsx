import React from 'react';

import {render, screen} from '@testing-library/react';

import {testCustomClassName, testOnClick} from '../../../../test-utils/shared/common';
import {FileLinkProps} from '../../../models';
import {getQaAttrubutes} from '../../../utils';
import FileLink from '../FileLink';

const fileLink = {
    href: 'qwe.pdf',
    text: 'Link to file',
    qa: 'file-link-component',
};

const TYPES: Array<FileLinkProps['type']> = ['horizontal', 'vertical'];
const TEXT_SIZES: Array<FileLinkProps['textSize']> = ['s', 'xs', 'm', 'l'];
const THEMES: Array<FileLinkProps['theme']> = ['default', 'dark', 'light'];

const qaAttributes = getQaAttrubutes(fileLink.qa, 'link', 'link-container');

describe('FileLink', () => {
    test('render FileLink by default', async () => {
        render(<FileLink {...fileLink} />);
        const component = screen.getByTestId(qaAttributes.default);

        expect(component).toBeInTheDocument();
        expect(component).toBeVisible();
    });

    test('render FileLink with text', async () => {
        render(<FileLink {...fileLink} />);
        const component = screen.getByTestId(qaAttributes.link);

        expect(component).toHaveTextContent(fileLink.text);
    });

    test('render FileLink with href', async () => {
        render(<FileLink {...fileLink} />);
        const component = screen.getByTestId(qaAttributes.link);

        expect(component).toHaveAttribute('href', fileLink.href);
    });

    test.each(new Array<FileLinkProps['type']>(...TYPES))('render with given "%s" type', (type) => {
        render(<FileLink {...fileLink} type={type} />);
        const cardBase = screen.getByTestId(qaAttributes.default);

        expect(cardBase).toHaveClass(`pc-file-link_type_${type}`);
    });

    test.each(new Array<FileLinkProps['textSize']>(...TEXT_SIZES))(
        'render with given "%s" textSize',
        (textSize) => {
            render(<FileLink {...fileLink} textSize={textSize} />);
            const cardBase = screen.getByTestId(qaAttributes.default);

            expect(cardBase).toHaveClass(`pc-file-link_size_${textSize}`);
        },
    );

    test('add className', () => {
        testCustomClassName<FileLinkProps>({
            component: FileLink,
            props: fileLink,
        });
    });

    test.each(new Array<FileLinkProps['theme']>(...THEMES))(
        'render with given "%s" theme',
        (theme) => {
            render(<FileLink {...fileLink} theme={theme} />);
            const cardBase = screen.getByTestId(qaAttributes.default);

            expect(cardBase).toHaveClass(`pc-file-link_theme_${theme}`);
        },
    );

    test('call onClick', async () => {
        testOnClick<FileLinkProps>({
            component: FileLink,
            props: fileLink,
            options: {qaId: qaAttributes.link},
        });
    });

    test.each(new Array<number>(1, 2, 3))('render with given "%s" tabIndex', (tabIndex) => {
        render(<FileLink {...fileLink} tabIndex={tabIndex} />);
        const cardBase = screen.getByTestId(qaAttributes.link);

        expect(cardBase).toHaveAttribute('tabIndex', tabIndex.toString());
    });

    test('render FileLink with urlTitle', async () => {
        const urlTitle = 'Url Title';
        render(<FileLink {...fileLink} urlTitle={urlTitle} />);
        const component = screen.getByTestId(qaAttributes.link);

        expect(component).toHaveAttribute('title', urlTitle);
    });
});
