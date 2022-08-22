import React, {useMemo} from 'react';
import {addons, types} from '@storybook/addons';
import {AddonPanel} from '@storybook/components';
import {useArgs} from '@storybook/api';
import yaml from 'js-yaml';
import {ClipboardButton} from '@yandex-cloud/uikit';

import './AddonYaml.css';

const ADDON_ID = 'yamladdon';
const PANEL_ID = `${ADDON_ID}/panel`;

const YamlPanel = () => {
    const [params] = useArgs();

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
        <div className="addon-yaml">
            <ClipboardButton text={content} />
            <pre>{content}</pre>
        </div>
    );
};

addons.register(ADDON_ID, () => {
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
