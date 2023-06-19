import React from 'react';

import {render, screen} from '@testing-library/react';

import {testCustomClassName} from '../../../../test-utils/shared/common';
import {qaIdByDefault} from '../../../components/Anchor/Anchor';
import {GridColumnSize} from '../../../grid';
import {BlockTypes, ClassNameProps, WithChildren} from '../../../models';
import BlockBase, {BlockBaseFullProps} from '../BlockBase';

const qaId = 'block-base-component';
const blockType = BlockTypes[0];

type ComponentProps = WithChildren<BlockBaseFullProps & ClassNameProps>;

describe('BlockBase', () => {
    test('render component by default', async () => {
        render(<BlockBase qa={qaId} type={blockType} />);
        const component = screen.getByTestId(qaId);

        expect(component).toBeInTheDocument();
        expect(component).toBeVisible();
        expect(component).not.toBeDisabled();
    });

    test('add className', () => {
        testCustomClassName<ComponentProps>({
            component: BlockBase,
            props: {qa: qaId, type: blockType},
        });
    });

    test('should reset paddings', () => {
        render(<BlockBase qa={qaId} resetPaddings={true} type={blockType} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass('pc-block-base_reset-paddings');
    });

    test.each(new Array<GridColumnSize>(...Object.values(GridColumnSize)))(
        'render with given "%s" size',
        (size) => {
            render(<BlockBase qa={qaId} visible={size} type={blockType} />);
            const component = screen.getByTestId(qaId);

            expect(component).toHaveClass(`d-${size}-block`);
        },
    );

    test('should have anchor', () => {
        const anchor = {
            text: 'anchor',
            url: 'https://github.com/gravity-ui/',
        };
        render(<BlockBase anchor={anchor} type={blockType} />);
        const component = screen.getByTestId(qaIdByDefault);

        expect(component).toBeInTheDocument();
        expect(component).toHaveAttribute('id', anchor.url);
    });
});
