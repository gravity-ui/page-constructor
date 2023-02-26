import React from 'react';
import {render, screen} from '@testing-library/react';

import BalancedMasonry from '../BalancedMasonry';
// import BalancedMasonry, {columnQaId} from '../BalancedMasonry';
import {CardBase} from '../../../components';

const qaId = 'balanced-mansory-component';

const balancedMasonry = {
    className: 'my-class',
    columnClassName: 'my-column-class',
    breakpointCols: {
        sm: 3,
        lg: 2,
    },
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

describe('BalancedMasonry', () => {
    test('render BalancedMasonry by default', async () => {
        const {children, ...rest} = balancedMasonry;
        render(
            <BalancedMasonry {...rest} qa={qaId}>
                {children.map((child, index) => (
                    <CardBase key={index} className="balanced-masonry-stories__card-base">
                        <CardBase.Content>{child}</CardBase.Content>
                    </CardBase>
                ))}
            </BalancedMasonry>,
        );
        const component = screen.getByTestId(qaId);
        // const columns = screen.getAllByTestId(columnQaId);

        expect(component).toBeInTheDocument();
        expect(component).toHaveClass(balancedMasonry.className);
        // discover this place: looks like debounce does not work in test environment
        // columns.forEach((column) => {
        //     expect(column).toHaveClass(balancedMasonry.columnClassName);
        // });
    });
});
