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
    [BlockType.YFM]: YFM,
    [BlockType.Layout]: Layout,
    [BlockType.Media]: Media,
    [BlockType.Banner]: Banner,
    [BlockType.CTA]: CTA,
    [BlockType.ColoredText]: ColoredText,
    [BlockType.Author]: Author,
    [BlockType.Suggest]: Suggest,
    [BlockType.Meta]: Meta,
    [BlockType.Feed]: Feed,
};

const headers = {
    [BlockType.Header]: Header,
};

export default {blocks, headers};
