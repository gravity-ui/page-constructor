import React from 'react';

import {render, screen} from '@testing-library/react';

import {testCustomClassName} from '../../../../test-utils/shared/common';
import {getQaAttrubutes} from '../../../utils';
import Foldable, {FoldableProps} from '../Foldable';

const foldableProps: FoldableProps = {
    isOpened: false,
    qa: 'foldable-component',
};

const IS_OPENED_CLASS_NAME = 'pc-foldable-block_open';

const qaAttributes = getQaAttrubutes(foldableProps.qa);

const FoldableComponent = (props: FoldableProps) => {
    return (
        <Foldable {...props}>
            <div>Children</div>
        </Foldable>
    );
};

describe('Foldable', () => {
    test('render Foldable by default', async () => {
        render(<FoldableComponent {...foldableProps} />);
        const foldable = screen.getByTestId(qaAttributes.default);
        const children = screen.getByText('Children');

        expect(foldable).toBeInTheDocument();
        expect(foldable).toBeVisible();
        expect(foldable).not.toBeDisabled();
        expect(foldable).not.toHaveClass(IS_OPENED_CLASS_NAME);

        expect(children).toBeInTheDocument();
    });

    test('render Foldable with isOpened = false', async () => {
        render(<FoldableComponent {...foldableProps} />);
        const foldable = screen.getByTestId(qaAttributes.default);

        expect(foldable).not.toHaveClass(IS_OPENED_CLASS_NAME);
    });

    test('render Foldable with isOpened = true', async () => {
        render(<FoldableComponent {...foldableProps} isOpened={true} />);
        const foldable = screen.getByTestId(qaAttributes.default);

        expect(foldable).toHaveClass(IS_OPENED_CLASS_NAME);
    });

    test('add className', () => {
        testCustomClassName<FoldableProps>({
            component: FoldableComponent,
            props: foldableProps,
        });
    });
});
