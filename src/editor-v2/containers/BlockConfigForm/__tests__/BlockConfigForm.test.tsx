import {ThemeProvider} from '@gravity-ui/uikit';
import {act, fireEvent, render, screen} from '@testing-library/react';

import type {ItemConfig} from '../../../../common/types';
import type {ConstructorBlock} from '../../../../models';
import {MainEditorStoreContext} from '../../../context/editorStore/MainEditorStoreContext';
import {createEditorStore} from '../../../store';
import BlockConfigForm from '../BlockConfigForm';

const blockConfig: ItemConfig = {
    type: 'markdown-test',
    schema: {
        name: 'Markdown block',
        inputs: [{type: 'markdownEditor', name: 'text', title: 'Text'}],
    },
};

const block = (text: string): ConstructorBlock => ({type: blockConfig.type, text});

const setup = (blocks: ConstructorBlock[], selectedBlock = [0]) => {
    const store = createEditorStore({
        content: {blocks},
        selectedBlock,
        blocks: [blockConfig],
        subBlocks: [blockConfig],
    });

    render(
        <ThemeProvider>
            <MainEditorStoreContext.Provider value={{state: store}}>
                <BlockConfigForm />
            </MainEditorStoreContext.Provider>
        </ThemeProvider>,
    );

    return store;
};

const undo = async (text: string, shiftKey = false) => {
    // eslint-disable-next-line testing-library/no-unnecessary-act -- Flush the editor's asynchronous MutationObserver updates.
    await act(async () => {
        fireEvent.keyDown(screen.getByText(text), {
            key: 'z',
            code: 'KeyZ',
            keyCode: 90,
            ctrlKey: true,
            shiftKey,
        });
    });
};

describe('BlockConfigForm Markdown history', () => {
    test.each([
        {name: 'top-level blocks', initial: [0], next: [1]},
        {name: 'nested blocks with the same child index', initial: [0, 0], next: [1, 0]},
    ])('isolates Undo and Redo between $name', async ({initial, next}) => {
        const blocks =
            initial.length === 1
                ? [block('Block A'), block('Block B')]
                : [
                      {...block('Parent A'), children: [block('Block A')]},
                      {...block('Parent B'), children: [block('Block B')]},
                  ];
        const store = setup(blocks, initial);
        expect(screen.getByText('Block A')).toBeInTheDocument();

        await act(async () => {
            store.getState().setSelectedBlock(next);
        });
        await undo('Block B');
        expect(screen.getByText('Block B')).toBeInTheDocument();
        expect(store.getState().content.blocks).toEqual(blocks);
        await undo('Block B', true);
        expect(store.getState().content.blocks).toEqual(blocks);

        await act(async () => {
            store.getState().setSelectedBlock(initial);
        });
        await undo('Block A');
        expect(screen.getByText('Block A')).toBeInTheDocument();
        expect(store.getState().content.blocks).toEqual(blocks);
    });

    test('keeps the editor and Undo on updates within the selected block', async () => {
        const store = setup([block('Block A')]);
        const paragraph = screen.getByText('Block A');

        await act(async () => {
            store.getState().setSelectedBlock([0]);
        });
        expect(screen.getByText('Block A')).toBe(paragraph);

        await act(async () => {
            store.getState().updateField('blocks[0].text', 'Edited A');
        });
        await undo('Edited A');
        expect(screen.getByText('Block A')).toBeInTheDocument();
        expect(store.getState().content.blocks[0]).toEqual(block('Block A'));
    });

    test('resets history even when the next block has the same text', async () => {
        const store = setup([block('Block A'), block('Shared text')]);

        await act(async () => {
            store.getState().updateField('blocks[0].text', 'Shared text');
        });
        await act(async () => {
            store.getState().setSelectedBlock([1]);
        });
        await undo('Shared text');

        expect(screen.getByText('Shared text')).toBeInTheDocument();
        expect(store.getState().content.blocks).toEqual([
            block('Shared text'),
            block('Shared text'),
        ]);
    });
});
