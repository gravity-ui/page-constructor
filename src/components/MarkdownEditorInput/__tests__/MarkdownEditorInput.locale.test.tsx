import {configure} from '@gravity-ui/markdown-editor';
import {Lang, ThemeProvider} from '@gravity-ui/uikit';
import type {StoryContext} from '@storybook/react';
import {render, screen} from '@testing-library/react';

import {withLang} from '../../../../.storybook/decorators/withLang';
import {LocaleContext} from '../../../gravity-blocks/context/localeContext';
import {MarkdownEditorInput} from '../MarkdownEditorInput';

import bundleRu from '@gravity-ui/markdown-editor/_/i18n/bundle/ru.json';
import menubarRu from '@gravity-ui/markdown-editor/_/i18n/menubar/ru.json';

test('updates the real editor labels on locale changes without replacing its content', () => {
    configure({lang: Lang.En});
    const onUpdate = jest.fn();
    const input = (lang?: `${Lang}`) => (
        <LocaleContext.Provider value={{lang}}>
            <MarkdownEditorInput value="Saved notes" onUpdate={onUpdate} />
        </LocaleContext.Provider>
    );
    const {rerender} = render(input(Lang.Ru), {wrapper: ThemeProvider});
    const content = screen.getByText('Saved notes');

    expect(screen.getByRole('button', {name: menubarRu.more_action})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: bundleRu.settings_label})).toBeInTheDocument();

    rerender(input(Lang.En));

    expect(screen.getByRole('button', {name: 'More actions'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Settings'})).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: menubarRu.more_action})).not.toBeInTheDocument();
    expect(screen.getByText('Saved notes')).toBe(content);

    rerender(input());

    expect(screen.getByRole('button', {name: menubarRu.more_action})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: bundleRu.settings_label})).toBeInTheDocument();
    expect(screen.getByText('Saved notes')).toBe(content);
    expect(onUpdate).not.toHaveBeenCalled();
});

test('follows the Storybook language global through the real decorator', () => {
    const onUpdate = jest.fn();
    const Story = () => <MarkdownEditorInput value="Saved notes" onUpdate={onUpdate} />;
    const input = (lang: Lang) => {
        const context: Partial<StoryContext> = {globals: {lang}};
        return withLang(Story, context as StoryContext);
    };
    const {rerender} = render(input(Lang.Ru), {wrapper: ThemeProvider});

    expect(screen.getByRole('button', {name: bundleRu.settings_label})).toBeInTheDocument();

    rerender(input(Lang.En));

    expect(screen.getByRole('button', {name: 'Settings'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'More actions'})).toBeInTheDocument();

    rerender(input(Lang.Ru));

    expect(screen.getByRole('button', {name: bundleRu.settings_label})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: menubarRu.more_action})).toBeInTheDocument();
    expect(onUpdate).not.toHaveBeenCalled();
});
