/* eslint-disable no-script-url -- Malicious URL fixtures verify the editor's XSS protection. */
import {ThemeProvider} from '@gravity-ui/uikit';
import {render, screen} from '@testing-library/react';

import {MarkdownEditorInput} from '../MarkdownEditorInput';

const fileMarkup = (href: string, name = 'report') => `{% file src="${href}" name="${name}" %}`;

describe('MarkdownEditorInput file URL safety', () => {
    test.each([
        'javascript:window.__reviewXss=1',
        'JaVaScRiPt:window.__reviewXss=1',
        'java\tscript:window.__reviewXss=1',
        'java\nscript:window.__reviewXss=1',
        'java\rscript:window.__reviewXss=1',
        'data:text/html,unsafe',
        'vbscript:unsafe',
        'file:///tmp/report.pdf',
        'blob:https://example.org/report',
        'https://[invalid',
    ])('renders an unsafe file URL as text: %j', (href) => {
        const onUpdate = jest.fn();
        render(<MarkdownEditorInput value={fileMarkup(href)} onUpdate={onUpdate} />, {
            wrapper: ThemeProvider,
        });

        expect(screen.getByText('report').tagName).toBe('SPAN');
        expect(screen.getByText('report')).not.toHaveAttribute('href');
        expect(screen.queryByRole('link', {name: 'report'})).not.toBeInTheDocument();
        expect(onUpdate).not.toHaveBeenCalled();
    });

    test.each([
        'https://example.org/report.pdf',
        'http://example.org/report.pdf',
        'HTTPS://example.org/report.pdf',
        '//example.org/report.pdf',
        '/files/report.pdf',
        '../report.pdf',
        './report.pdf',
        'report.pdf',
        '?download=report',
        '#report',
    ])('preserves an HTTP(S) or relative file URL: %s', (href) => {
        render(<MarkdownEditorInput value={fileMarkup(href)} onUpdate={jest.fn()} />, {
            wrapper: ThemeProvider,
        });

        expect(screen.getByRole('link', {name: 'report'})).toHaveAttribute('href', href);
        expect(screen.getByRole('link', {name: 'report'})).toHaveAttribute('download', 'report');
    });

    test('checks externally replaced content without echoing or rewriting it', () => {
        const onUpdate = jest.fn();
        const {rerender} = render(
            <MarkdownEditorInput value={fileMarkup('/report.pdf')} onUpdate={onUpdate} />,
            {wrapper: ThemeProvider},
        );
        expect(screen.getByRole('link', {name: 'report'})).toBeInTheDocument();

        rerender(
            <MarkdownEditorInput
                value={fileMarkup('javascript:window.__reviewXss=1')}
                onUpdate={onUpdate}
            />,
        );
        expect(screen.queryByRole('link', {name: 'report'})).not.toBeInTheDocument();
        expect(screen.getByText('report').tagName).toBe('SPAN');

        rerender(<MarkdownEditorInput value={fileMarkup('/report.pdf')} onUpdate={onUpdate} />);
        expect(screen.getByRole('link', {name: 'report'})).toHaveAttribute('href', '/report.pdf');
        expect(onUpdate).not.toHaveBeenCalled();
    });

    test('renders the blocked file name as text', () => {
        const name = '<img src=x onerror=alert(1)>';
        render(
            <MarkdownEditorInput
                value={fileMarkup('javascript:window.__reviewXss=1', name)}
                onUpdate={jest.fn()}
            />,
            {wrapper: ThemeProvider},
        );

        expect(screen.getByText(name).tagName).toBe('SPAN');
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
});
