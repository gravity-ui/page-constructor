import * as React from 'react';
import {AddonPanel} from '@storybook/components';
import {addons, types, useChannel, useGlobals} from '@storybook/manager-api';
import {ClipboardButton, ThemeProvider} from '@gravity-ui/uikit';

import {ADDON_ID, EVENT_ID, PANEL_ID} from './constants';

import './AddonResult.css';

const ResultPanel = () => {
    const [globals] = useGlobals();
    const [content, setContent] = React.useState<unknown>(null);

    useChannel({
        [EVENT_ID]: (value: unknown) => {
            setContent(value);
        },
    });

    const json = React.useMemo(
        () => (content !== null ? JSON.stringify(content, null, 2) : ''),
        [content],
    );

    return (
        <ThemeProvider theme={globals.theme}>
            <div className="result-addon">
                {json ? <ClipboardButton text={json} /> : null}
                <pre>{json || <span className="result-addon__empty">No data yet</span>}</pre>
            </div>
        </ThemeProvider>
    );
};

addons.register(ADDON_ID, () => {
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: 'Result',
        paramKey: 'resultPanel',
        render: ({active, key}) => (
            <AddonPanel active={Boolean(active)} key={key}>
                <ResultPanel />
            </AddonPanel>
        ),
    });
});
