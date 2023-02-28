import {BlockType, SubBlockType} from './models';

import {
    Partner,
    PriceDetailed,
    MediaCard,
    NewsCard,
    TutorialCard,
    CardWithImage,
    LayoutItem,
    BackgroundCard,
    Content,
    Quote,
    Divider,
    BannerCard,
    BasicCard,
} from './sub-blocks';

import {
    BannerBlock,
    CompaniesBlock,
    SimpleBlock,
    MediaBlock,
    MapBlock,
    PreviewBlock,
    InfoBlock,
    SecurityBlock,
    SliderBlock,
    ExtendedFeaturesBlock,
    PromoFeaturesBlock,
    QuestionsBlock,
    TableBlock,
    TabsBlock,
    LinkTableBlock,
    HeaderBlock,
    IconsBlock,
    HeaderSliderBlock,
    CardLayoutBlock,
    ContentLayoutBlock,
    ShareBlock,
    FilterBlock,
} from './blocks';

import withCardLayoutItem from './blocks/CardLayout/withCardLayoutItem';
import withFilterableItem from './blocks/FilterBlock/withFilterableItem';
import {withConstructorBlock} from './containers/PageConstructor/components/ConstructorBlock';

export const blockMap = {
    [BlockType.SliderBlock]: SliderBlock,
    [BlockType.SimpleBlock]: SimpleBlock,
    [BlockType.ExtendedFeaturesBlock]: ExtendedFeaturesBlock,
    [BlockType.PromoFeaturesBlock]: PromoFeaturesBlock,
    [BlockType.QuestionsBlock]: QuestionsBlock,
    [BlockType.BannerBlock]: BannerBlock,
    [BlockType.CompaniesBlock]: CompaniesBlock,
    [BlockType.MediaBlock]: MediaBlock,
    [BlockType.PreviewBlock]: PreviewBlock,
    [BlockType.InfoBlock]: InfoBlock,
    [BlockType.SecurityBlock]: SecurityBlock,
    [BlockType.TableBlock]: TableBlock,
    [BlockType.TabsBlock]: TabsBlock,
    [BlockType.LinkTableBlock]: LinkTableBlock,
    [BlockType.HeaderBlock]: HeaderBlock,
    [BlockType.IconsBlock]: IconsBlock,
    [BlockType.HeaderSliderBlock]: HeaderSliderBlock,
    [BlockType.CardLayoutBlock]: CardLayoutBlock,
    [BlockType.ContentLayoutBlock]: ContentLayoutBlock,
    [BlockType.ShareBlock]: ShareBlock,
    [BlockType.MapBlock]: MapBlock,
    [BlockType.FilterBlock]: FilterBlock,
};

export const subBlockMap = {
    [SubBlockType.Divider]: Divider,
    /**
     * @deprecated Will be removed, use basic card instead
     */
    [SubBlockType.TutorialCard]: TutorialCard,
    /**
     * @deprecated Will be removed, use basic card instead
     */
    [SubBlockType.Partner]: Partner,
    [SubBlockType.PriceDetailed]: PriceDetailed,
    [SubBlockType.MediaCard]: MediaCard,
    [SubBlockType.BannerCard]: BannerCard,
    [SubBlockType.NewsCard]: NewsCard,
    [SubBlockType.LayoutItem]: LayoutItem,
    /**
     * @deprecated Use LayoutItem
     */
    [SubBlockType.CardWithImage]: CardWithImage,
    [SubBlockType.BackgroundCard]: BackgroundCard,
    [SubBlockType.BasicCard]: BasicCard,
    [SubBlockType.Content]: Content,
    [SubBlockType.Quote]: Quote,
};

export const itemWrappers = [withConstructorBlock, withCardLayoutItem, withFilterableItem];
