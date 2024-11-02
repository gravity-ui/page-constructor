import React from 'react';

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
import BannerBlockConfig from './blocks/Banner';
import CardLayoutBlockConfig from './blocks/CardLayout';
import CompaniesBlockConfig from './blocks/Companies';
import ContentLayoutBlockConfig from './blocks/ContentLayout';
import ExtendedFeaturesBlockConfig from './blocks/ExtendedFeatures';
import FilterBlockConfig from './blocks/FilterBlock';
import FormBlockConfig from './blocks/Form';
import HeaderBlockConfig from './blocks/Header';
import HeaderSliderBlockConfig from './blocks/HeaderSlider';
import IconsBlockConfig from './blocks/Icons';
import InfoBlockConfig from './blocks/Info';
import MapBlockConfig from './blocks/Map';
import MediaBlockConfig from './blocks/Media';
import PromoFeaturesBlockConfig from './blocks/PromoFeaturesBlock';
import QuestionsBlockConfig from './blocks/Questions';
import ShareBlockConfig from './blocks/Share';
import SliderBlockConfig from './blocks/Slider';
import TableBlockConfig from './blocks/Table';
import TabsBlockConfig from './blocks/Tabs';
import TestEditorBlockConfig from './blocks/TestEditorBlock';
import TestEditorBlock from './blocks/TestEditorBlock/TestEditorBlock';
import {BlockConfig} from './common/types';
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
import BackgroundCardConfig from './sub-blocks/BackgroundCard';
import BannerCardConfig from './sub-blocks/BannerCard';
import BasicCardConfig from './sub-blocks/BasicCard';
import ContentConfig from './sub-blocks/Content';
import DividerConfig from './sub-blocks/Divider';
import ImageCardConfig from './sub-blocks/ImageCard';
import LayoutItemConfig from './sub-blocks/LayoutItem';
import MediaCardConfig from './sub-blocks/MediaCard';
import PriceCardConfig from './sub-blocks/PriceCard';
import PriceDetailedConfig from './sub-blocks/PriceDetailed';
import QuoteConfig from './sub-blocks/Quote';

/**
 * @deprecated use blockDataMap
 **/
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
    // unstable
    [BlockType.SliderNewBlock]: SliderNewBlock,
    [BlockType.TestEditorBlock]: TestEditorBlock,
};

/**
 * @deprecated use blockDataMap
 **/
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

export interface BlockData {
    // TODO: remove any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>;
    schema: BlockConfig;
}

export const blockDataMap: Record<string, BlockData> = {
    [BlockType.ExtendedFeaturesBlock]: ExtendedFeaturesBlockConfig,
    [BlockType.PromoFeaturesBlock]: PromoFeaturesBlockConfig,
    [BlockType.QuestionsBlock]: QuestionsBlockConfig,
    [BlockType.BannerBlock]: BannerBlockConfig,
    [BlockType.CompaniesBlock]: CompaniesBlockConfig,
    [BlockType.MediaBlock]: MediaBlockConfig,
    [BlockType.InfoBlock]: InfoBlockConfig,
    [BlockType.TableBlock]: TableBlockConfig,
    [BlockType.TabsBlock]: TabsBlockConfig,
    [BlockType.HeaderBlock]: HeaderBlockConfig,
    [BlockType.IconsBlock]: IconsBlockConfig,
    [BlockType.HeaderSliderBlock]: HeaderSliderBlockConfig,
    [BlockType.CardLayoutBlock]: CardLayoutBlockConfig,
    [BlockType.ContentLayoutBlock]: ContentLayoutBlockConfig,
    [BlockType.ShareBlock]: ShareBlockConfig,
    [BlockType.MapBlock]: MapBlockConfig,
    [BlockType.FilterBlock]: FilterBlockConfig,
    [BlockType.FormBlock]: FormBlockConfig,
    [BlockType.TestEditorBlock]: TestEditorBlockConfig,
    [BlockType.SliderBlock]: SliderBlockConfig,

    [SubBlockType.Divider]: DividerConfig,
    [SubBlockType.PriceDetailed]: PriceDetailedConfig,
    [SubBlockType.MediaCard]: MediaCardConfig,
    [SubBlockType.BannerCard]: BannerCardConfig,
    [SubBlockType.LayoutItem]: LayoutItemConfig,
    [SubBlockType.BackgroundCard]: BackgroundCardConfig,
    [SubBlockType.BasicCard]: BasicCardConfig,
    [SubBlockType.Content]: ContentConfig,
    [SubBlockType.Quote]: QuoteConfig,
    [SubBlockType.PriceCard]: PriceCardConfig,
    [SubBlockType.ImageCard]: ImageCardConfig,
};
