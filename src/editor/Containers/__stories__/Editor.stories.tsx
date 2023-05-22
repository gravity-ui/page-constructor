import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {scriptsSrc, ymapApiKeyForStorybook} from '../../../../.storybook/maps';
import {MapType} from '../../../context/mapsContext/mapsContext';
import {MapProvider} from '../../../context/mapsContext/mapsProvider';
import {EDITOR} from '../../../demo/constants';
import {EditorIncomingProps} from '../../../editor/types';
import {Editor} from '../Editor';

import data from './data.json';

export default {
    title: `${EDITOR}/Main`,
    component: Editor,
} as Meta;

const DefaultTemplate: Story<EditorIncomingProps> = (args) => (
    <MapProvider
        scriptSrc={scriptsSrc[MapType.Yandex]}
        apiKey={ymapApiKeyForStorybook}
        type={MapType.Yandex}
    >
        <Editor {...args} />
    </MapProvider>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default as EditorIncomingProps;
