// import * as React from 'react';

// import {Meta, StoryFn} from '@storybook/react';

// import {scriptsSrc, ymapApiKeyForStorybook} from '../../../../.storybook/maps';
// import {LocaleContext} from '../../../context/localeContext';
// import {MapType} from '../../../context/mapsContext/mapsContext';
// import {MapProvider} from '../../../context/mapsContext/mapsProvider';
// import {PageContent} from '../../../models';
// import {contentTransformer} from '../../../text-transform';
// import {EditorProps} from '../../types';
// import {Editor} from '../Editor/Editor';

// import {memoizeLast} from './utils';

// import data from './data.json';

// export default {
//     title: 'Editor/Main',
//     component: Editor,
// } as Meta;

// const contentTransformerMemoized = memoizeLast(contentTransformer);

// const DefaultTemplate: StoryFn<EditorProps> = (args) => {
//     const {lang} = React.useContext(LocaleContext);

//     const transformContent = React.useCallback(
//         (content: PageContent) => ({
//             ...content,
//             ...contentTransformerMemoized({content, options: {lang}}),
//         }),
//         [lang],
//     );

//     return (
//         <MapProvider
//             scriptSrc={scriptsSrc[MapType.Yandex]}
//             apiKey={ymapApiKeyForStorybook}
//             type={MapType.Yandex}
//         >
//             <Editor {...args} transformContent={transformContent} />
//         </MapProvider>
//     );
// };

// export const Default = DefaultTemplate.bind({});

// Default.args = data.default as Pick<EditorProps, 'content'>;
