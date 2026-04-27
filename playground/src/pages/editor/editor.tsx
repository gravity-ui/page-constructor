import * as React from 'react';

import {Button, Menu, Popup, ThemeProvider} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';

import {PageContent} from '../../../../src';
import {EditorProvider, EditorView, usePCEditorSettings} from '../../../../src/editor-v2';

import contentExample1 from '../pc/example-2/content.json';

import './editor.scss';

const b = block('editor');

interface NavItem {
    label: string;
    url: string;
}

const NAV_ITEMS: NavItem[] = [
    {label: 'Gravity Blocks — page 1', url: '/?page=gravity-blocks&id=1'},
    {label: 'Gravity Blocks — page 2', url: '/?page=gravity-blocks&id=2'},
    {label: 'Experimental page', url: '/?page=experemental'},
];

const NavigateToButton = () => {
    const [buttonElement, setButtonElement] = React.useState<HTMLElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const {changeUrl} = usePCEditorSettings();

    return (
        <div style={{width: '100%', height: '100%', padding: '12px 16px'}}>
            <Button ref={setButtonElement} onClick={() => setOpen((prev) => !prev)}>
                Navigate to
            </Button>
            <Popup anchorElement={buttonElement} open={open} placement="bottom">
                <Menu>
                    {NAV_ITEMS.map((item) => (
                        <Menu.Item
                            key={item.url}
                            onClick={() => {
                                changeUrl(window.location.origin + item.url);
                                setOpen(false);
                            }}
                        >
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </Popup>
        </div>
    );
};

export default function EditorPage() {
    const initialUrl =
        typeof window === 'undefined' ? '' : window.location.origin + '/?page=gravity-blocks&id=1';

    const [content, setContent] = React.useState<PageContent>(contentExample1);

    return (
        <ThemeProvider theme={'light'}>
            <div className={b()}>
                {initialUrl && (
                    <EditorProvider initialUrl={initialUrl} disableUrlField={true}>
                        <EditorView
                            content={content}
                            slots={{rightTop: [NavigateToButton]}}
                            onUpdate={setContent}
                        />
                    </EditorProvider>
                )}
            </div>
        </ThemeProvider>
    );
}
