import * as React from 'react';
import {AddonPanel} from '@storybook/components';
import {addons, types, useGlobals, useArgs} from '@storybook/manager-api';
import yaml from 'js-yaml';
import {ClipboardButton, Provider} from '@gravity-ui/uikit';

import './AddonYaml.css';

const ADDON_ID = 'yamladdon';
const PANEL_ID = `${ADDON_ID}/panel`;

const YamlPanel = () => {
    const [params] = useArgs();
    const [globals] = useGlobals();

    const content = React.useMemo(
        () =>
            yaml.dump([params], {
                flowLevel: -1,
                lineWidth: -1,
                forceQuotes: true,
                skipInvalid: true,
                noRefs: true,
            }),
        [params],
    );

    return (
        <Provider theme={globals.theme}>
            <div className="yaml-addon">
                <ClipboardButton text={content} />
                <pre>{content}</pre>
            </div>
        </Provider>
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
