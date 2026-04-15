import {BlockData} from '../constructor-items';

import BannerBlockConfig from './Banner';
import BannerBlockConfigDeprecated from './Banner/index_deprecated';
import CardLayoutBlockConfig from './CardLayout';
import CardLayoutBlockConfigDeprecated from './CardLayout/index_deprecated';
// import CompaniesBlockConfig from './Companies';
import CompaniesBlockConfigDeprecated from './Companies/index_deprecated';
import ContentLayoutBlockConfig from './ContentLayout';
import ContentLayoutBlockConfigDeprecated from './ContentLayout/index_deprecated';
import ExtendedFeaturesBlockConfig from './ExtendedFeatures';
import ExtendedFeaturesBlockConfigDeprecated from './ExtendedFeatures/index_deprecated';
// import FilterBlockConfig from './FilterBlock';
import FilterBlockConfigDeprecated from './FilterBlock/index_deprecated';
// import FoldableListBlockConfig from './FoldableList';
// import FoldableListBlockConfigDeprecated from './FoldableList/index_deprecated';
// import FormBlockConfig from './Form';
import FormBlockConfigDeprecated from './Form/index_deprecated';
import HeaderBlockConfig from './Header';
import HeaderBlockConfigDeprecated from './Header/index_deprecated';
// import HeaderSliderBlockConfig from './HeaderSlider';
import HeaderSliderBlockConfigDeprecated from './HeaderSlider/index_deprecated';
// import IconsBlockConfig from './Icons';
import IconsBlockConfigDeprecated from './Icons/index_deprecated';
import InfoBlockConfig from './Info';
import InfoBlockConfigDeprecated from './Info/index_deprecated';
// import MapBlockConfig from './Map';
import MapBlockConfigDeprecated from './Map/index_deprecated';
import MediaBlockConfig from './Media';
import MediaBlockConfigDeprecated from './Media/index_deprecated';
// import PromoFeaturesBlockConfig from './PromoFeaturesBlock';
import PromoFeaturesBlockConfigDeprecated from './PromoFeaturesBlock/index_deprecated';
import QuestionsBlockConfig from './Questions';
import QuestionsBlockConfigDeprecated from './Questions/index_deprecated';
// import SecurityBlockConfig from './Security';
// import SecurityBlockConfigDeprecated from './Security/index_deprecated';
// import ShareBlockConfig from './Share';
import ShareBlockConfigDeprecated from './Share/index_deprecated';
import SliderBlockConfig from './Slider';
import SliderBlockConfigDeprecated from './Slider/index_deprecated';
// import SliderOldBlockConfig from './SliderOld';
// import SliderOldBlockConfigDeprecated from './SliderOld/index_deprecated';
// import TableBlockConfig from './Table';
import TableBlockConfigDeprecated from './Table/index_deprecated';
import TabsBlockConfig from './Tabs';
import TabsBlockConfigDeprecated from './Tabs/index_deprecated';
import MediaCardConfig from '../sub-blocks/MediaCard';
import MediaCardConfigDeprecated from '../sub-blocks/MediaCard/index_deprecated';
import LayoutItemConfig from '../sub-blocks/LayoutItem';
import LayoutItemConfigDeprecated from '../sub-blocks/LayoutItem/index_deprecated';

export {default as BannerBlock} from './Banner/Banner';
export {default as CompaniesBlock} from './Companies/Companies';
export {default as InfoBlock} from './Info/Info';
export {default as MediaBlock} from './Media/Media';
export {default as MapBlock} from './Map/Map';
export {default as SliderOldBlock} from './SliderOld/SliderOld';
export {default as SliderBlock} from './Slider/Slider';
export type {Swiper, SwiperOptions} from './Slider/Slider';
export {default as ExtendedFeaturesBlock} from './ExtendedFeatures/ExtendedFeatures';
export {default as PromoFeaturesBlock} from './PromoFeaturesBlock/PromoFeaturesBlock';
export {default as QuestionsBlock} from './Questions/Questions';
export {default as FoldableListBlock} from './FoldableList/FoldableList';
export {default as TableBlock} from './Table/Table';
export {default as TabsBlock} from './Tabs/Tabs';
export {default as HeaderBlock} from './Header/Header';
export {default as HeroBlock} from './Hero/Hero';
export {default as IconsBlock} from './Icons/Icons';
export {default as HeaderSliderBlock} from './HeaderSlider/HeaderSlider';
export {default as CardLayoutBlock} from './CardLayout/CardLayout';
export {default as ContentLayoutBlock} from './ContentLayout/ContentLayout';
export {default as ShareBlock} from './Share/Share';
export {default as FilterBlock} from './FilterBlock/FilterBlock';
export {default as FormBlock} from './Form/Form';
export {default as MediaCardConfig} from '../sub-blocks/MediaCard';
export {default as MediaCardConfigDeprecated} from '../sub-blocks/MediaCard/index_deprecated';

export const blocks: Array<BlockData> = [
    BannerBlockConfig,
    BannerBlockConfigDeprecated,
    CardLayoutBlockConfig,
    CardLayoutBlockConfigDeprecated,
    // CompaniesBlockConfig,
    CompaniesBlockConfigDeprecated,
    ContentLayoutBlockConfig,
    ContentLayoutBlockConfigDeprecated,
    ExtendedFeaturesBlockConfig,
    ExtendedFeaturesBlockConfigDeprecated,
    // PromoFeaturesBlockConfig,
    PromoFeaturesBlockConfigDeprecated,
    QuestionsBlockConfig,
    QuestionsBlockConfigDeprecated,
    MediaBlockConfig,
    MediaBlockConfigDeprecated,
    // MapBlockConfig,
    MapBlockConfigDeprecated,
    InfoBlockConfig,
    InfoBlockConfigDeprecated,
    HeaderBlockConfig,
    HeaderBlockConfigDeprecated,
    // FilterBlockConfig,
    FilterBlockConfigDeprecated,
    // FormBlockConfig,
    FormBlockConfigDeprecated,
    // HeaderSliderBlockConfig,
    HeaderSliderBlockConfigDeprecated,
    // IconsBlockConfig,
    IconsBlockConfigDeprecated,
    // ShareBlockConfig,
    ShareBlockConfigDeprecated,
    SliderBlockConfig,
    SliderBlockConfigDeprecated,
    // TableBlockConfig,
    TableBlockConfigDeprecated,
    TabsBlockConfig,
    TabsBlockConfigDeprecated,

    MediaCardConfig,
    MediaCardConfigDeprecated,
    LayoutItemConfig,
    LayoutItemConfigDeprecated,

    // [SubBlockType.Divider]: DividerConfig,
    // [SubBlockType.MediaCard]: MediaCardConfig,
    // [SubBlockType.BannerCard]: BannerCardConfig,
    // [SubBlockType.LayoutItem]: LayoutItemConfig,
    // [SubBlockType.BackgroundCard]: BackgroundCardConfig,
    // [SubBlockType.BasicCard]: BasicCardConfig,
    // [SubBlockType.Content]: ContentConfig,
    // [SubBlockType.Quote]: QuoteConfig,
    // [SubBlockType.PriceCard]: PriceCardConfig,
    // [SubBlockType.ImageCard]: ImageCardConfig,
];
