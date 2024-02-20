import React, {useMemo} from 'react';
import {addons, types} from '@storybook/addons';
import {AddonPanel} from '@storybook/components';
import {useGlobals} from '@storybook/manager-api';
import {useArgs} from '@storybook/api';
import yaml from 'js-yaml';
import {ClipboardButton, ThemeProvider} from '@gravity-ui/uikit';

import './AddonYaml.css';

const ADDON_ID = 'yamladdon';
const PANEL_ID = `${ADDON_ID}/panel`;

const YamlPanel = () => {
    const [params] = useArgs();
    const [globals] = useGlobals();

    const content = useMemo(
        () =>
            yaml.dump([params], {
                flowLevel: -1,
                lineWidth: -1,
                forceQuotes: true,
                skipInvalid: true,
            }),
        [params],
    );

    return (
        <ThemeProvider theme={globals.theme}>
            <div className="yaml-addon">
                <ClipboardButton text={content} />
                <pre>{content}</pre>
            </div>
        </ThemeProvider>
    );
};

addons.register(ADDON_ID, (api) => {
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: 'YAML',
        render: ({active, key}) => (
            <AddonPanel active={Boolean(active)} key={key}>
                <YamlPanel />
            </AddonPanel>
        ),
    });
});
