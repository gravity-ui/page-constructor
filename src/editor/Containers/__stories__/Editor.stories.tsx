import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {scriptsSrc, ymapApiKeyForStorybook} from '../../../../.storybook/maps';
import {PageConstructor} from '../../../containers/PageConstructor';
import {MapType} from '../../../context/mapsContext/mapsContext';
import {MapProvider} from '../../../context/mapsContext/mapsProvider';
import {EDITOR} from '../../../demo/constants';
import {EditorProps} from '../../../editor/types';
import {Editor} from '../Editor/Editor';

import data from './data.json';

export default {
    title: `${EDITOR}/Main`,
    component: Editor,
} as Meta;

const DefaultTemplate: Story<EditorProps> = (args) => (
    <MapProvider
        scriptSrc={scriptsSrc[MapType.Yandex]}
        apiKey={ymapApiKeyForStorybook}
        type={MapType.Yandex}
    >
        <Editor {...args}>{(props) => <PageConstructor {...props} />}</Editor>
    </MapProvider>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default as Pick<EditorProps, 'content'>;
