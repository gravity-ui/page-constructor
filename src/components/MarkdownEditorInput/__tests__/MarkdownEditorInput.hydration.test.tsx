import {ThemeProvider} from '@gravity-ui/uikit';
import {act, screen} from '@testing-library/react';
import {hydrateRoot} from 'react-dom/client';

import {MarkdownEditorInput} from '../MarkdownEditorInput';

// Use the Node renderer while retaining jsdom's browser conditions for the editor.
const {renderToString} =
    jest.requireActual<typeof import('react-dom/server')>('react-dom/server.node');

test('hydrates the fallback and mounts the editor without losing the value', async () => {
    const onUpdate = jest.fn();
    const onRecoverableError = jest.fn();
    const input = (
        <ThemeProvider>
            <MarkdownEditorInput
                value="**Saved notes**"
                onUpdate={onUpdate}
                placeholder="Write notes"
                className="custom-input"
                qa="markdown-editor"
            />
        </ThemeProvider>
    );
    const container = document.createElement('div');
    document.body.appendChild(container);
    container.innerHTML = renderToString(input);

    expect(screen.getByRole('textbox')).toHaveValue('**Saved notes**');
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Write notes');
    expect(screen.getByTestId('markdown-editor')).toHaveClass('custom-input');

    let root: ReturnType<typeof hydrateRoot> | undefined;
    try {
        await act(async () => {
            root = hydrateRoot(container, input, {onRecoverableError});
        });

        expect(screen.getByTestId('markdown-editor')).toHaveTextContent('Saved notes');
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
        expect(screen.getByText('Saved notes').tagName).toBe('STRONG');
        expect(onRecoverableError).not.toHaveBeenCalled();
        expect(onUpdate).not.toHaveBeenCalled();
    } finally {
        act(() => root?.unmount());
        container.remove();
    }
});
