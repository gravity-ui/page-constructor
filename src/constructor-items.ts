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
    MarqueeLinks,
    MediaBlock,
    PromoFeaturesBlock,
    QuestionsBlock,
    ShareBlock,
    SliderBlock,
    TableBlock,
    TabsBlock,
} from './blocks';
import {SliderNewBlock} from './blocks/unstable';
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
    ImageCard,
    LayoutItem,
    MediaCard,
    PriceCard,
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
    [BlockType.MarqueeLinks]: MarqueeLinks,
    // unstable
    [BlockType.SliderNewBlock]: SliderNewBlock,
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
    [SubBlockType.PriceCard]: PriceCard,
    [SubBlockType.ImageCard]: ImageCard,
};

export const navItemMap = {
    [NavigationItemType.Button]: NavigationButton,
    [NavigationItemType.Social]: SocialIcon,
    [NavigationItemType.Dropdown]: NavigationDropdown,
    [NavigationItemType.Link]: NavigationLink,
    [NavigationItemType.GithubButton]: GithubButton,
};
