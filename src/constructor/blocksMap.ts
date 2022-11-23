import {BlockType} from '../models/blog';

import {Header} from '../blocks/Header/Header';
import {YFM} from '../blocks/YFM/YFM';
import {Layout} from '../blocks/Layout/Layout';
import {Media} from '../blocks/Media/Media';
import {CTA} from '../blocks/CTA/CTA';
import {ColoredText} from '../blocks/ColoredText/ColoredText';
import {Author} from '../blocks/Author/Author';
import {Suggest} from '../blocks/Suggest/Suggest';
import {Banner} from '../blocks/Banner/BlogBanner';
import {Meta} from '../blocks/Meta/Meta';
import {Feed} from '../blocks/Feed/Feed';

const blocks = {
    [BlockType.BlogYFMBlock]: YFM,
    [BlockType.BlogLayoutBlock]: Layout,
    [BlockType.BlogMediaBlock]: Media,
    [BlockType.BlogBannerBlock]: Banner,
    [BlockType.BlogCTABlock]: CTA,
    [BlockType.BlogColoredTextBlock]: ColoredText,
    [BlockType.BlogAuthorBlock]: Author,
    [BlockType.BlogSuggestBlock]: Suggest,
    [BlockType.BlogMetaBlock]: Meta,
    [BlockType.BlogFeedBlock]: Feed,
};

const headers = {
    [BlockType.BlogHeaderBlock]: Header,
};

export default {blocks, headers};
