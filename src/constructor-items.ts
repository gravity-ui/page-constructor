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
    LinkTableBlock,
    MapBlock,
    MediaBlock,
    PromoFeaturesBlock,
    QuestionsBlock,
    SecurityBlock,
    ShareBlock,
    SimpleBlock,
    SliderBlock,
    TableBlock,
    TabsBlock,
} from './blocks';
import {BlockType, SubBlockType} from './models';
import {
    BackgroundCard,
    BannerCard,
    BasicCard,
    CardWithImage,
    Content,
    Divider,
    LayoutItem,
    MediaCard,
    NewsCard,
    Partner,
    PriceDetailed,
    Quote,
    TutorialCard,
} from './sub-blocks';

export const blockMap = {
    [BlockType.SliderBlock]: SliderBlock,
    [BlockType.SimpleBlock]: SimpleBlock,
    [BlockType.ExtendedFeaturesBlock]: ExtendedFeaturesBlock,
    [BlockType.PromoFeaturesBlock]: PromoFeaturesBlock,
    [BlockType.QuestionsBlock]: QuestionsBlock,
    [BlockType.BannerBlock]: BannerBlock,
    [BlockType.CompaniesBlock]: CompaniesBlock,
    [BlockType.MediaBlock]: MediaBlock,
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
