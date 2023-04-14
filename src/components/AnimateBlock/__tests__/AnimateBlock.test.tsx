import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AnimateBlock from '../AnimateBlock';

const qaId = 'animate-block';

describe('AnimateBlock', () => {
    test('render AnimateBlock by default', async () => {
        render(<AnimateBlock qa={qaId} />);

        const component = screen.getByTestId(qaId);
        expect(component).toBeInTheDocument();
    });

    test('add className', () => {
        const className = 'my-class';

        render(<AnimateBlock qa={qaId} className={className} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(className);
    });

    test('add className', () => {
        const className = 'my-class';

        render(<AnimateBlock qa={qaId} className={className} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveClass(className);
    });

    test('use passed style', () => {
        const style = {color: 'red'};

        render(<AnimateBlock style={style} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        expect(component).toHaveStyle(style);
    });

    test('call onUpdate with checked status', async () => {
        const onScroll = jest.fn();
        const user = userEvent.setup();

        render(<AnimateBlock onScroll={onScroll} qa={qaId} />);
        const component = screen.getByTestId(qaId);

        await user.click(component);
        expect(onScroll).toHaveBeenCalledTimes(1);
    });
});
