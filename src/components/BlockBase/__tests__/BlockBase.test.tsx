import React from 'react';

import {render, screen} from '@testing-library/react';

import {testCustomClassName} from '../../../../test-utils/shared/common';
import {qaIdByDefault} from '../../../components/Anchor/Anchor';
import {GridColumnSize} from '../../../grid';
import {BlockBaseProps, ClassNameProps, WithChildren} from '../../../models';
import BlockBase from '../BlockBase';

const qaId = 'block-base-component';

type ComponentProps = WithChildren<BlockBaseProps & ClassNameProps>;

describe('BlockBase', () => {
    test('render component by default', async () => {
        render(<BlockBase qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toBeInTheDocument();
        expect(component).toBeVisible();
        expect(component).not.toBeDisabled();
    });

    test('add className', () => {
        testCustomClassName<ComponentProps>({
            component: BlockBase,
            props: {qa: qaId},
        });
    });

    test('should reset paddings', () => {
        render(<BlockBase qa={qaId} resetPaddings={true} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass('pc-block-base_reset-paddings');
    });

    test.each(new Array<GridColumnSize>(...Object.values(GridColumnSize)))(
        'render with given "%s" size',
        (size) => {
            render(<BlockBase qa={qaId} visible={size} />);
            const component = screen.getByTestId(qaId);

            expect(component).toHaveClass(`d-${size}-block`);
        },
    );

    test('should have anchor', () => {
        const anchor = {
            text: 'anchor',
            url: 'https://github.com/gravity-ui/',
        };
        render(<BlockBase anchor={anchor} />);
        const component = screen.getByTestId(qaIdByDefault);

        expect(component).toBeInTheDocument();
        expect(component).toHaveAttribute('id', anchor.url);
    });
});
