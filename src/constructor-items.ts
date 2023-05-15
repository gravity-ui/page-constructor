import {
    BannerBlock,
    CardLayoutBlock,
    CompaniesBlock,
    ContentLayoutBlock,
    ExtendedFeaturesBlock,
    FilterBlock,
    HeaderBlock,
    HeaderSliderBlock,
    IconsBlock,
    InfoBlock,
    MapBlock,
    MediaBlock,
    PromoFeaturesBlock,
    QuestionsBlock,
    ShareBlock,
    SliderBlock,
    TableBlock,
    TabsBlock,
} from './blocks';
import {BlockType, SubBlockType} from './models';
import {
    BackgroundCard,
    BannerCard,
    BasicCard,
    Content,
    Divider,
    LayoutItem,
    MediaCard,
    NewsCard,
    PriceDetailed,
    Quote,
} from './sub-blocks';

export const blockMap = {
    [BlockType.SliderBlock]: SliderBlock,
    [BlockType.ExtendedFeaturesBlock]: ExtendedFeaturesBlock,
    [BlockType.PromoFeaturesBlock]: PromoFeaturesBlock,
    [BlockType.QuestionsBlock]: QuestionsBlock,
    [BlockType.BannerBlock]: BannerBlock,
    [BlockType.CompaniesBlock]: CompaniesBlock,
    [BlockType.MediaBlock]: MediaBlock,
    [BlockType.InfoBlock]: InfoBlock,
    [BlockType.TableBlock]: TableBlock,
    [BlockType.TabsBlock]: TabsBlock,
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
    [SubBlockType.PriceDetailed]: PriceDetailed,
    [SubBlockType.MediaCard]: MediaCard,
    [SubBlockType.BannerCard]: BannerCard,
    [SubBlockType.NewsCard]: NewsCard,
    [SubBlockType.LayoutItem]: LayoutItem,
    [SubBlockType.BackgroundCard]: BackgroundCard,
    [SubBlockType.BasicCard]: BasicCard,
    [SubBlockType.Content]: Content,
    [SubBlockType.Quote]: Quote,
};
