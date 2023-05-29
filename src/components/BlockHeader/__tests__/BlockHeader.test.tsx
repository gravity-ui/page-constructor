import React from 'react';

import {render, screen, within} from '@testing-library/react';

import {testCustomClassName} from '../../../../test-utils/shared/common';
import {GridColumnSizesType} from '../../../grid/index';
import BlockHeader, {BlockHeaderProps} from '../BlockHeader';

const qaId = 'block-header-component';

const headerProps = {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    description:
        '**Ut enim ad minim veniam** [quis nostrud](https://example.com) exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
};

const colSizes = [
    {all: 12, xl: 8, lg: 6, md: 4, sm: 3},
    {all: 12, lg: 8, md: 6, sm: 4},
    {all: 12, md: 8, sm: 6},
    {all: 12, sm: 8},
];

describe('BlockHeader', () => {
    test('render BlockHeader by default', () => {
        render(<BlockHeader {...headerProps} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toBeInTheDocument();
        expect(component).toBeVisible();
    });

    test('add className', () => {
        testCustomClassName<BlockHeaderProps>({
            component: BlockHeader,
            props: {
                ...headerProps,
                qa: qaId,
            },
        });
    });

    test('has title', () => {
        render(<BlockHeader {...headerProps} />);
        const component = screen.getByText(headerProps.title);

        expect(component).toBeInTheDocument();
    });

    test('has description', () => {
        render(<BlockHeader {...headerProps} />);
        const component = screen.getByText(headerProps.description);

        expect(component).toBeInTheDocument();
    });

    test.each(new Array<GridColumnSizesType>(...colSizes))('add colSize "%s"', (size) => {
        render(<BlockHeader {...headerProps} colSizes={size} qa={qaId} />);
        const component = screen.getByTestId(qaId);
        const columns = within(component).getAllByRole('pc-column');
        columns.forEach((column) => {
            const sizeEntries = Object.entries(size);
            sizeEntries.forEach(([key, value]) => {
                expect(column).toHaveClass(`col-${key === 'all' ? '' : `${key}-`}${value}`);
            });
        });
    });
});
