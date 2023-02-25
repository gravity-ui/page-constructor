import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ButtonTabs, {ButtonTabsItemProps} from '../ButtonTabs';

const qaId = 'button-tabs-component';

const items: ButtonTabsItemProps[] = [
    {
        id: '0',
        title: 'tab-1',
    },
    {
        id: '1',
        title: 'tab-2',
    },
    {
        id: '2',
        title: 'tab-3',
    },
];

describe('ButtonTabs', () => {
    test('render ButtonTabs by default', async () => {
        render(<ButtonTabs items={items} qa={qaId} />);
        const buttonTabs = screen.getByTestId(qaId);

        expect(buttonTabs).toBeInTheDocument();
        expect(buttonTabs).toBeVisible();
        expect(buttonTabs).not.toBeDisabled();
    });

    test('has active tab', async () => {
        const activeTabId = 1;
        render(<ButtonTabs items={items} qa={qaId} activeTab={String(activeTabId)} />);
        const buttons = screen.getAllByRole('button');

        buttons.forEach((button, index) => {
            if (index === activeTabId) {
                expect(button).toHaveClass('pc-button-block_theme_monochrome');
            } else {
                expect(button).toHaveClass('pc-button-block_theme_normal');
            }
        });
    });

    test('add className', () => {
        const className = 'my-class';

        render(<ButtonTabs items={items} qa={qaId} className={className} />);
        const buttonTabs = screen.getByTestId(qaId);

        expect(buttonTabs).toHaveClass(className);
    });

    test('call onSelectTab', async () => {
        const user = userEvent.setup();
        const handleOnClick = jest.fn();
        render(<ButtonTabs items={items} qa={qaId} onSelectTab={handleOnClick} />);

        const buttons = screen.getAllByRole('button');

        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            await user.click(button);
            expect(handleOnClick).toHaveBeenCalledTimes(i + 1);
        }
    });
});
