import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {testCustomClassName, testCustomStyle} from '../../../../test-utils/shared/common';
import {WithChildren} from '../../../models';
import AnimateBlock, {AnimateBlockProps} from '../AnimateBlock';

const qaId = 'animate-block';

type ComponentProps = WithChildren<AnimateBlockProps>;

describe('AnimateBlock', () => {
    test('render AnimateBlock by default', async () => {
        render(<AnimateBlock qa={qaId} />);

        const component = screen.getByTestId(qaId);
        expect(component).toBeInTheDocument();
    });

    test('add className', () => {
        testCustomClassName<ComponentProps>({
            component: AnimateBlock,
            props: {qa: qaId},
        });
    });

    test('use passed style', () => {
        testCustomStyle<ComponentProps>({
            component: AnimateBlock,
            props: {qa: qaId},
        });
    });

    test('call onScroll', async () => {
        const onScroll = jest.fn();
        const user = userEvent.setup();

        render(
            <div style={{paddingTop: 100000}}>
                <AnimateBlock onScroll={onScroll} qa={qaId} />
            </div>,
        );
        const component = screen.getByTestId(qaId);

        await user.hover(component);
        expect(onScroll).toHaveBeenCalledTimes(1);
    });
});
