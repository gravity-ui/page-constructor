import {BlockType} from '../models/blog';

import {BlogHeader} from '../blocks/BlogHeader/BlogHeader';
import {YFMBlock} from '../blocks/BlogYFM/BlogYFM';
import {BlogLayout} from '../blocks/BlogLayout/BlogLayout';
import {BlogMediaBlock} from '../blocks/BlogMedia/BlogMedia';
import {BlogCTABlock} from '../blocks/BlogCTA/BlogCTA';
import {BlogColoredTextBlock} from '../blocks/BlogColoredText/BlogColoredText';
import {Author} from '../blocks/Author/Author';
import {BlogSuggestBlock} from '../blocks/BlogSuggest/BlogSuggest';
import {Banner} from '../blocks/Banner/BlogBanner';
import {MetaBlock} from '../blocks/BlogMeta/BlogMeta';
import {BlogFeed} from '../blocks/BlogFeed/BlogFeed';

const blocks = {
    [BlockType.BlogYFMBlock]: YFMBlock,
    [BlockType.BlogLayoutBlock]: BlogLayout,
    [BlockType.BlogMediaBlock]: BlogMediaBlock,
    [BlockType.BlogBannerBlock]: Banner,
    [BlockType.BlogCTABlock]: BlogCTABlock,
    [BlockType.BlogColoredTextBlock]: BlogColoredTextBlock,
    [BlockType.BlogAuthorBlock]: Author,
    [BlockType.BlogSuggestBlock]: BlogSuggestBlock,
    [BlockType.BlogMetaBlock]: MetaBlock,
    [BlockType.BlogFeedBlock]: BlogFeed,
};

const headers = {
    [BlockType.BlogHeaderBlock]: BlogHeader,
};

export default {blocks, headers};
