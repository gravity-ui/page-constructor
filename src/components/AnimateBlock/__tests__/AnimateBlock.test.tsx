import * as React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {testCustomClassName, testCustomStyle} from '../../../../test-utils/shared/common';
import AnimateBlock, {AnimateBlockProps} from '../AnimateBlock';

const qa = 'animate-block';

type ComponentProps = React.PropsWithChildren<AnimateBlockProps>;

describe('AnimateBlock', () => {
    test('render AnimateBlock by default', async () => {
        render(<AnimateBlock qa={qa} />);

        const component = screen.getByTestId(qa);
        expect(component).toBeInTheDocument();
    });

    test('add className', () => {
        testCustomClassName<ComponentProps>({
            component: AnimateBlock,
            props: {qa},
        });
    });

    test('use passed style', () => {
        testCustomStyle<ComponentProps>({
            component: AnimateBlock,
            props: {qa},
        });
    });

    test('call onScroll', async () => {
        const onScroll = jest.fn();
        const user = userEvent.setup();

        render(
            <div style={{paddingTop: 100000}}>
                <AnimateBlock onScroll={onScroll} qa={qa} />
            </div>,
        );
        const component = screen.getByTestId(qa);

        await user.hover(component);
        expect(onScroll).toHaveBeenCalledTimes(1);
    });
});
