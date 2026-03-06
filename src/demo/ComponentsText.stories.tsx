import {Meta, StoryFn} from '@storybook/react';

import {blockTransform, yfmTransform} from '../../.storybook/utils';
import Author from '../components/Author/Author';
import ContentList from '../components/ContentList/ContentList';
import MetaInfo from '../components/MetaInfo/MetaInfo';
import Title from '../components/Title/Title';
import YFMWrapper from '../components/YFMWrapper/YFMWrapper';
import {AuthorType, ContentListProps, CustomBlock, TitleItemProps} from '../models';

import authorData from '../components/Author/__stories__/data.json';
import contentListData from '../components/ContentList/__stories__/data.json';
import metaInfoData from '../components/MetaInfo/__stories__/data.json';
import titleData from '../components/Title/__stories__/data.json';
import yfmWrapperData from '../components/YFMWrapper/__stories__/data.json';

export default {title: 'Lab/Tokenization/Components/Text'} as Meta;

const defaultTitleArgs = {
    ...titleData.default.content,
    subtitle: yfmTransform(titleData.default.content.subtitle),
};

const transformContentList = (item: unknown) =>
    blockTransform(item as unknown as CustomBlock) as ContentListProps;

export const Default: StoryFn = () => (
    <div style={{padding: '40px', display: 'flex', flexDirection: 'column', gap: '48px'}}>
        <section>
            <strong>Title — default</strong>
            <Title {...defaultTitleArgs} />
        </section>
        <section>
            <strong>Title — sizes (l → xs)</strong>
            <div>
                {Object.entries(titleData.sizes).map(([size, props]) => (
                    <div key={size} style={{paddingBottom: '32px'}}>
                        <Title {...defaultTitleArgs} title={props as TitleItemProps} />
                    </div>
                ))}
            </div>
        </section>
        <section>
            <strong>Title — with link</strong>
            <Title
                {...defaultTitleArgs}
                title={titleData.titleLink.content.title as TitleItemProps}
            />
        </section>
        <section>
            <strong>YFMWrapper</strong>
            <YFMWrapper {...yfmWrapperData.default.content} />
        </section>
        <section>
            <strong>Author — column</strong>
            <Author {...authorData.default.content} />
        </section>
        <section>
            <strong>Author — line</strong>
            <Author {...authorData.default.content} type={AuthorType.Line} />
        </section>
        <section>
            <strong>ContentList — default</strong>
            <ContentList {...transformContentList(contentListData.default)} />
        </section>
        <section>
            <strong>ContentList — without icon</strong>
            <ContentList {...transformContentList(contentListData.withoutIcon)} />
        </section>
        <section>
            <strong>ContentList — sizes (s / m / l)</strong>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {contentListData.sizes.map((item, index) => (
                    <ContentList key={index} {...transformContentList(item)} />
                ))}
            </div>
        </section>
        <section>
            <strong>MetaInfo</strong>
            <MetaInfo {...metaInfoData.default.content} />
        </section>
    </div>
);
