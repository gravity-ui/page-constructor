import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {testCustomClassName} from '../../../../test-utils/shared/common';
import ButtonTabs, {ButtonTabsItemProps, ButtonTabsProps} from '../ButtonTabs';

const qa = 'button-tabs-component';

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
        render(<ButtonTabs items={items} qa={qa} />);
        const buttonTabs = screen.getByTestId(qa);

        expect(buttonTabs).toBeInTheDocument();
        expect(buttonTabs).toBeVisible();
        expect(buttonTabs).not.toBeDisabled();
    });

    test('has active tab', async () => {
        const activeTabId = 1;
        render(<ButtonTabs items={items} qa={qa} activeTab={String(activeTabId)} />);
        const buttons = screen.getAllByRole('tab');

        buttons.forEach((button, index) => {
            if (index === activeTabId) {
                expect(button).toHaveClass('pc-button-tabs__item_active');
            }

            expect(button).toHaveClass('pc-button-block_theme_normal');
        });
    });

    test('add className', () => {
        testCustomClassName<ButtonTabsProps>({
            component: ButtonTabs,
            props: {items: items, qa},
        });
    });

    test('call onSelectTab', async () => {
        const user = userEvent.setup();
        const handleOnClick = jest.fn();
        render(<ButtonTabs items={items} qa={qa} onSelectTab={handleOnClick} />);

        const buttons = screen.getAllByRole('tab');

        buttons.forEach(async (button, i) => {
            await user.click(button);
            expect(handleOnClick).toHaveBeenCalledTimes(i + 1);
        });
    });
});
