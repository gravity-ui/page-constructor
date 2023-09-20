import React from 'react';

import {render, screen, waitFor} from '@testing-library/react';
import omit from 'lodash/omit';

import {testCustomClassName} from '../../../../test-utils/shared/common';
import {CardBase} from '../../../components';
import {getQaAttrubutes} from '../../../utils';
import BalancedMasonry, {BalancedMasonryProps} from '../BalancedMasonry';

const balancedMasonry = {
    className: 'my-class',
    columnClassName: 'my-column-class',
    breakpointCols: {
        1440: 3,
        1441: 2,
    },
    qa: 'balanced-mansory-component',
    children: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    ],
};

const {children: childrenToRender} = balancedMasonry;
const balancedMasonryChildren = childrenToRender.map((child, index) => (
    <CardBase key={index} className="balanced-masonry-stories__card-base">
        <CardBase.Content>{child}</CardBase.Content>
    </CardBase>
));

const qaAttributes = getQaAttrubutes(balancedMasonry.qa, 'column');

describe('BalancedMasonry', () => {
    test('render BalancedMasonry by default', async () => {
        render(
            <BalancedMasonry {...omit(balancedMasonry, 'children')}>
                {balancedMasonryChildren}
            </BalancedMasonry>,
        );
        const component = screen.getByTestId(balancedMasonry.qa);

        expect(component).toBeInTheDocument();
        expect(component).toBeVisible();
    });

    test('add className to container', () => {
        testCustomClassName<BalancedMasonryProps>({
            component: BalancedMasonry,
            props: {...omit(balancedMasonry, 'children'), children: balancedMasonryChildren},
        });
    });

    test('add className to column', async () => {
        render(
            <BalancedMasonry {...omit(balancedMasonry, 'children')}>
                {balancedMasonryChildren}
            </BalancedMasonry>,
        );
        await waitFor(() => {
            expect(screen.getAllByTestId(qaAttributes.column)[0]).toBeInTheDocument();
        });

        const components = screen.queryAllByTestId(qaAttributes.column);
        expect(components[0]).toHaveClass(balancedMasonry.columnClassName);
    });

    test('render width 1440px', async () => {
        const width = 1440;
        Object.defineProperty(document.body, 'clientWidth', {
            writable: true,
            configurable: true,
            value: width,
        });

        render(
            <BalancedMasonry {...omit(balancedMasonry, 'children')}>
                {balancedMasonryChildren}
            </BalancedMasonry>,
        );
        await waitFor(() => {
            expect(screen.getAllByTestId(qaAttributes.column)[0]).toBeInTheDocument();
        });

        const components = screen.queryAllByTestId(qaAttributes.column);
        expect(components.length).toEqual(balancedMasonry.breakpointCols[width]);
    });

    test('render width 1441px', async () => {
        const width = 1441;
        Object.defineProperty(document.body, 'clientWidth', {
            writable: true,
            configurable: true,
            value: width,
        });

        render(
            <BalancedMasonry {...omit(balancedMasonry, 'children')}>
                {balancedMasonryChildren}
            </BalancedMasonry>,
        );
        await waitFor(() => {
            expect(screen.getAllByTestId(qaAttributes.column)[0]).toBeInTheDocument();
        });

        const components = screen.queryAllByTestId(qaAttributes.column);
        expect(components.length).toEqual(balancedMasonry.breakpointCols[width]);
    });
});
