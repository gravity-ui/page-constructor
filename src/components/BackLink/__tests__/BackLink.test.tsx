import {ButtonSize} from '@gravity-ui/uikit';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {History, LocationContext} from '../../../context/locationContext';
import BackLink, {Theme} from '../BackLink';

const backLinkProps = {
    url: '#',
    title: 'Button Title',
    theme: 'default' as Theme,
    size: 's' as ButtonSize,
    className: 'customClassName',
    shouldHandleBackAction: true,
    onClick: () => {},
};

describe('BackLink', () => {
    test('Default render', async () => {
        render(<BackLink {...backLinkProps} />);
        const backLink = screen.getByRole('button');
        expect(backLink).toBeInTheDocument();
    });

    test('should preserve native click handlers and tabIndex from extraProps', () => {
        const onClick = jest.fn((event) => event.preventDefault());
        render(
            <BackLink
                {...backLinkProps}
                shouldHandleBackAction={false}
                extraProps={{onClick, tabIndex: -1}}
            />,
        );
        const link = screen.getByRole('link');
        fireEvent.click(link);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(link).toHaveAttribute('tabindex', '-1');
    });

    test('should prefer the root tabIndex over extraProps', () => {
        render(<BackLink {...backLinkProps} tabIndex={0} extraProps={{tabIndex: -1}} />);
        expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
    });

    test('Has custom class', async () => {
        render(<BackLink {...backLinkProps} />);
        const backLink = screen.getByRole('button');
        expect(backLink).toHaveClass(backLinkProps.className);
    });

    test('Should render <a /> tag', async () => {
        render(<BackLink {...backLinkProps} shouldHandleBackAction={false} />);
        const backLink = screen.getByRole('link');
        expect(backLink).toBeVisible();
        expect(backLink).toHaveAttribute('href', backLinkProps.url);
    });

    test('Should render title', async () => {
        render(<BackLink {...backLinkProps} />);
        const backLink = screen.getByText(backLinkProps.title);
        expect(backLink).toBeInTheDocument();
    });

    test('Call onClick', async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();
        render(
            <LocationContext.Provider value={{history: {push: jest.fn()} as unknown as History}}>
                <BackLink {...backLinkProps} onClick={handleClick} />
            </LocationContext.Provider>,
        );
        const backLink = screen.getByRole('button');
        await user.click(backLink);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test.each(new Array<ButtonSize>('s', 'm', 'l', 'xl'))('Render with given "%s" size', (size) => {
        render(<BackLink {...backLinkProps} size={size} />);
        const backLink = screen.getByRole('button');
        expect(backLink).toHaveClass(`g-button_size_${size}`);
    });

    test.each(new Array<Theme>('default', 'special'))('Render with given "%s" theme', (theme) => {
        const matchView: Record<Theme, string> = {
            default: 'flat-secondary',
            special: 'flat',
        };
        render(<BackLink {...backLinkProps} theme={theme} />);
        const backLink = screen.getByRole('button');
        expect(backLink).toHaveClass(`g-button_view_${matchView[theme]}`);
    });
});
