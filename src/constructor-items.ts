import {
    BannerBlock,
    CardLayoutBlock,
    CompaniesBlock,
    ContentLayoutBlock,
    ExtendedFeaturesBlock,
    FilterBlock,
    FormBlock,
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
import {BlockType, NavigationItemType, SubBlockType} from './models';
import {
    GithubButton,
    NavigationButton,
    NavigationDropdown,
    NavigationLink,
} from './navigation/components/NavigationItem';
import SocialIcon from './navigation/components/SocialIcon/SocialIcon';
import {
    BackgroundCard,
    BannerCard,
    BasicCard,
    Content,
    Divider,
    LayoutItem,
    MediaCard,
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
    [BlockType.FormBlock]: FormBlock,
};

export const subBlockMap = {
    [SubBlockType.Divider]: Divider,
    [SubBlockType.PriceDetailed]: PriceDetailed,
    [SubBlockType.MediaCard]: MediaCard,
    [SubBlockType.BannerCard]: BannerCard,
    [SubBlockType.LayoutItem]: LayoutItem,
    [SubBlockType.BackgroundCard]: BackgroundCard,
    [SubBlockType.BasicCard]: BasicCard,
    [SubBlockType.Content]: Content,
    [SubBlockType.Quote]: Quote,
};

export const navItemMap = {
    [NavigationItemType.Button]: NavigationButton,
    [NavigationItemType.Social]: SocialIcon,
    [NavigationItemType.Dropdown]: NavigationDropdown,
    [NavigationItemType.Link]: NavigationLink,
    [NavigationItemType.GithubButton]: GithubButton,
};
