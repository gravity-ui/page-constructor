import React, {useCallback, useContext} from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {scriptsSrc, ymapApiKeyForStorybook} from '../../../../.storybook/maps';
import {LocaleContext} from '../../../context/localeContext';
import {MapType} from '../../../context/mapsContext/mapsContext';
import {MapProvider} from '../../../context/mapsContext/mapsProvider';
import {EDITOR} from '../../../demo/constants';
import {PageContent} from '../../../models';
import {contentTransformer} from '../../../text-transform';
import {EditorProps} from '../../types';
import {Editor} from '../Editor/Editor';

import {memoizeLast} from './utils';

import data from './data.json';

export default {
    title: `${EDITOR}/Main`,
    component: Editor,
} as Meta;

const contentTransformerMemoized = memoizeLast(contentTransformer);

const DefaultTemplate: Story<EditorProps> = (args) => {
    const {lang} = useContext(LocaleContext);

    const transformContent = useCallback(
        (content: PageContent) => ({
            ...content,
            ...contentTransformerMemoized({content, options: {lang}}),
        }),
        [lang],
    );

    return (
        <MapProvider
            scriptSrc={scriptsSrc[MapType.Yandex]}
            apiKey={ymapApiKeyForStorybook}
            type={MapType.Yandex}
        >
            <Editor {...args} transformContent={transformContent} />
        </MapProvider>
    );
};

export const Default = DefaultTemplate.bind({});

Default.args = data.default as Pick<EditorProps, 'content'>;
