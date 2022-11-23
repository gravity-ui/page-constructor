import {BlockType} from '../models/blog';

import {Header} from '../blocks/Header/Header';
import {YFMBlock} from '../blocks/BlogYFM/BlogYFM';
import {BlogLayout} from '../blocks/BlogLayout/BlogLayout';
import {BlogMediaBlock} from '../blocks/BlogMedia/BlogMedia';
import {CTA} from '../blocks/CTA/CTA';
import {ColoredText} from '../blocks/ColoredText/ColoredText';
import {Author} from '../blocks/Author/Author';
import {BlogSuggestBlock} from '../blocks/BlogSuggest/BlogSuggest';
import {Banner} from '../blocks/Banner/BlogBanner';
import {MetaBlock} from '../blocks/BlogMeta/BlogMeta';
import {Feed} from '../blocks/Feed/Feed';

const blocks = {
    [BlockType.BlogYFMBlock]: YFMBlock,
    [BlockType.BlogLayoutBlock]: BlogLayout,
    [BlockType.BlogMediaBlock]: BlogMediaBlock,
    [BlockType.BlogBannerBlock]: Banner,
    [BlockType.BlogCTABlock]: CTA,
    [BlockType.BlogColoredTextBlock]: ColoredText,
    [BlockType.BlogAuthorBlock]: Author,
    [BlockType.BlogSuggestBlock]: BlogSuggestBlock,
    [BlockType.BlogMetaBlock]: MetaBlock,
    [BlockType.BlogFeedBlock]: Feed,
};

const headers = {
    [BlockType.BlogHeaderBlock]: Header,
};

export default {blocks, headers};
