import React from 'react';

import {ButtonSize} from '@gravity-ui/uikit';

import {GridColumnSize, GridColumnSizesType, IndentValue} from '../../grid/types';
import {ThemeSupporting} from '../../utils';
import {AnalyticsEventsBase} from '../common';

import {
    AnchorProps,
    Animatable,
    BackgroundImageProps,
    ButtonProps,
    CardBorder,
    ContentSize,
    ContentTextSize,
    ContentTheme,
    FileLinkProps,
    HeaderBreadCrumbsProps,
    HeaderImageSize,
    HeaderOffset,
    HeaderWidth,
    ImageDeviceProps,
    ImageProps,
    Justify,
    LegendTableMarkerType,
    LinkProps,
    MapProps,
    MediaDirection,
    MediaProps,
    MediaView,
    TextSize,
    TextTheme,
    ThemedImage,
    ThemedMediaProps,
    ThemedMediaVideoProps,
    TitleItemBaseProps,
    TitleItemProps,
    WithBorder,
    YandexFormProps,
} from './common';
import {BannerCardProps, HubspotFormProps, SubBlock, SubBlockModels} from './sub-blocks';

export enum BlockType {
    PromoFeaturesBlock = 'promo-features-block',
    ExtendedFeaturesBlock = 'extended-features-block',
    SliderBlock = 'slider-block',
    QuestionsBlock = 'questions-block',
    BannerBlock = 'banner-block',
    CompaniesBlock = 'companies-block',
    MediaBlock = 'media-block',
    InfoBlock = 'info-block',
    TableBlock = 'table-block',
    TabsBlock = 'tabs-block',
    HeaderSliderBlock = 'header-slider-block',
    HeaderBlock = 'header-block',
    IconsBlock = 'icons-block',
    CardLayoutBlock = 'card-layout-block',
    ContentLayoutBlock = 'content-layout-block',
    ShareBlock = 'share-block',
    MapBlock = 'map-block',
    FilterBlock = 'filter-block',
    FormBlock = 'form-block',
    TestEditorBlock = 'test-editor-block',
}

export const BlockTypes = Object.values(BlockType);
export const HeaderBlockTypes = [BlockType.HeaderBlock, BlockType.HeaderSliderBlock];

export interface Childable {
    children?: SubBlock[];
}

//block props
export interface BlockBaseProps {
    anchor?: AnchorProps;
    visible?: GridColumnSize;
    /** @deprecated */
    resetPaddings?: boolean;
    indent?: {
        top?: IndentValue;
        bottom?: IndentValue;
    };
    qa?: string;
}

export interface LoadableProps {
    source: string;
    /**
     * @deprecated Will be moved to params
     */
    serviceId?: number;
    params?: Record<string, string | number | boolean>;
}

export interface LoadableChildren {
    loadable?: LoadableProps;
}

export enum SliderBreakpointNames {
    Sm = 'sm',
    Md = 'md',
    Lg = 'lg',
    Xl = 'xl',
}

export enum SliderType {
    MediaCard = 'media-card',
    HeaderCard = 'header-card',
}

export type SliderBreakpointParams = Record<SliderBreakpointNames, number>;
export type SlidesToShow = Partial<SliderBreakpointParams> | number;

export interface SliderProps extends Childable, Animatable, LoadableChildren {
    dots?: boolean;
    arrows?: boolean;
    slidesToShow?: SlidesToShow;
    disclaimer?: {
        text: string;
        size?: TextSize;
    };
    title?: TitleItemBaseProps;
    description?: string;
    autoplay?: number;
    //for server transforms
    randomOrder?: boolean;
    adaptive?: boolean;
}

export interface HeaderSliderBlockProps extends Omit<SliderProps, 'title' | 'description'> {
    items: HeaderBlockProps[];
}

interface HeaderBackgroundProps {
    /** @deprecated replaced by Media Props image */
    url?: string;
    /** @deprecated replaced by Media Props image */
    disableCompress?: boolean;
}

export interface HeaderBlockBackground extends Partial<HeaderBackgroundProps>, Partial<MediaProps> {
    fullWidth?: boolean;
    fullWidthMedia?: boolean;
}

export type ThemedHeaderBlockBackground = ThemeSupporting<HeaderBlockBackground>;

export interface HeaderBlockProps {
    title: string;
    overtitle?: string;
    description?: string;
    buttons?: Pick<ButtonProps, 'url' | 'text' | 'theme' | 'primary' | 'size' | 'extraProps'>[];
    width?: HeaderWidth;
    /** @deprecated imageSize now depends on width */
    imageSize?: HeaderImageSize;
    /**
     * @deprecated used only on the main page
     * TODO: delete after the possibility to remove padding-bottom in the block
     */
    offset?: HeaderOffset;
    image?: ThemedImage;
    video?: ThemedMediaVideoProps;
    mediaView?: MediaView;
    background?: ThemedHeaderBlockBackground;
    theme?: 'light' | 'dark';
    verticalOffset?: '0' | 's' | 'm' | 'l' | 'xl';
    breadcrumbs?: HeaderBreadCrumbsProps;
    status?: JSX.Element;
    renderTitle?: (title: string) => React.ReactNode;
}

export interface ExtendedFeaturesItem
    extends Omit<ContentBlockProps, 'theme' | 'centered' | 'colSizes' | 'size' | 'title'> {
    title: string;
    label?: string;
    icon?: ThemedImage;
    /** @deprecated **/
    link?: LinkProps;
}

export interface ExtendedFeaturesProps extends Animatable {
    items: ExtendedFeaturesItem[];
    title?: TitleItemProps | string;
    description?: string;
    colSizes?: GridColumnSizesType;
}

export interface PromoFeaturesItem {
    title: string;
    text: string;
    theme?: 'accent' | 'accent-light' | 'primary';
    media?: MediaProps;
}

export interface PromoFeaturesProps extends Animatable {
    items: PromoFeaturesItem[];
    title?: TitleItemProps | string;
    description?: string;
    theme?: 'grey' | 'default';
}

export interface QuestionItem {
    title: string;
    text: string;
    listStyle?: 'dash' | 'disk';
    link?: LinkProps;
}

export interface QuestionsProps
    extends Omit<ContentBlockProps, 'colSizes' | 'centered' | 'size' | 'theme'> {
    items: QuestionItem[];
}

export interface QuestionBlockItemProps extends QuestionItem {
    isOpened: boolean;
    onClick: () => void;
}

export interface BannerBlockProps extends BannerCardProps, Animatable {}

export interface CompaniesBlockProps extends Animatable {
    title: string;
    description?: string;
    images: ThemeSupporting<ImageDeviceProps>;
}

export interface MediaBaseBlockProps extends Animatable, MediaContentProps {
    direction?: MediaDirection;
    mobileDirection?: MediaDirection;
    largeMedia?: boolean;
    mediaOnly?: boolean;
    mediaOnlyColSizes?: GridColumnSizesType;
}

export interface MediaContentProps
    extends Omit<ContentBlockProps, 'colSizes' | 'text' | 'title' | 'theme' | 'centered'> {
    title: string;
    description?: string;
    /** @deprecated  Use array of buttons from ContentBlockProps instead**/
    button?: ButtonProps;
}

export interface MediaBlockProps extends MediaBaseBlockProps, WithBorder {
    media: ThemeSupporting<MediaProps>;
}

export interface MapBlockProps extends MediaBaseBlockProps, WithBorder {
    map: MapProps;
}

export interface InfoBlockProps {
    theme?: TextTheme;
    backgroundColor?: ThemeSupporting<string>;
    /** @deprecated **/
    title?: string;
    /** @deprecated **/
    buttons?: Pick<ButtonProps, 'url' | 'text' | 'theme'>[];
    /** @deprecated **/
    sectionsTitle?: string;
    /** @deprecated **/
    links?: Pick<LinkProps, 'text' | 'url'>[];
    leftContent?: Omit<ContentBlockProps, 'colSizes' | 'theme' | 'size'>;
    rightContent?: Omit<ContentBlockProps, 'colSizes' | 'theme' | 'size'>;
}

export interface TableProps {
    content: string[][];
    legend?: string[];
    hideLegend?: boolean;
    justify?: Justify[];
    marker?: LegendTableMarkerType;
    /**
     * Only as accessible name, not displayed explicitly
     */
    caption?: string;
}

export interface TableBlockProps {
    title: string;
    table: TableProps;
}

export interface TabsBlockItem
    extends Omit<ContentBlockProps, 'size' | 'colSizes' | 'centered' | 'theme'>,
        WithBorder {
    tabName: string;
    /**
     * @deprecated Use array links from ContentBlockProps instead
     */
    link?: LinkProps;
    image?: ThemedImage;
    caption?: string;
    media?: ThemedMediaProps;
}

export interface TabsBlockProps extends Animatable {
    title?: TitleItemProps | string;
    description?: string;
    tabsColSizes?: GridColumnSizesType;
    centered?: boolean;
    direction?: MediaDirection;
    items: TabsBlockItem[];
    contentSize?: ContentSize;
}

export interface CardLayoutBlockProps extends Childable, Animatable, LoadableChildren {
    title?: TitleItemProps | string;
    titleClassName?: string;
    description?: string;
    colSizes?: GridColumnSizesType;
    background?: BackgroundImageProps & {
        border?: CardBorder;
    };
}

export type FilterTag = {
    id: string;
    label: string;
};

export type FilterItem = {
    tags: string[];
    card: SubBlockModels;
};

export interface FilterBlockProps extends Animatable, LoadableChildren {
    title?: TitleItemProps | string;
    description?: string;
    tags: FilterTag[];
    items: FilterItem[];
    tagButtonSize?: ButtonSize;
    allTag?: boolean | string;
    colSizes?: GridColumnSizesType;
    centered?: boolean;
}

export interface IconsBlockItemProps extends AnalyticsEventsBase {
    url: string;
    text: string;
    src: string;
}

export interface IconsBlockProps {
    title?: string;
    description?: string;
    size?: 's' | 'm' | 'l';
    items: IconsBlockItemProps[];
    colSizes?: GridColumnSizesType;
}

interface ContentLayoutBlockParams {
    size?: ContentSize;
    background?: BackgroundImageProps;
    centered?: boolean;
    theme?: ContentTheme;
    textWidth?: ContentTextSize;
}

export interface ContentLayoutBlockProps extends ContentLayoutBlockParams {
    textContent: ContentBlockProps;
    fileContent?: FileLinkProps[];
}

export type SVGIcon = React.FC<React.SVGProps<SVGSVGElement>>;

export interface ContentItemProps {
    title?: string;
    text?: string;
    icon: ThemeSupporting<ImageProps | SVGIcon>;
}

export interface ContentListProps {
    list: ContentItemProps[];
    size: ContentSize;
    theme?: ContentTheme;
}

export interface ContentBlockProps {
    title?: TitleItemBaseProps | string;
    titleId?: string;
    text?: string;
    textId?: string;
    additionalInfo?: string;
    links?: LinkProps[];
    buttons?: ButtonProps[];
    size?: ContentSize;
    colSizes?: GridColumnSizesType;
    centered?: boolean;
    theme?: ContentTheme;
    list?: ContentItemProps[];
    controlPosition?: 'default' | 'bottom';
}

export enum PCShareSocialNetwork {
    Vk = 'vk',
    Telegram = 'telegram',
    Twitter = 'twitter',
    Facebook = 'facebook',
    LinkedIn = 'linkedin',
}

export interface ShareBlockProps {
    items: PCShareSocialNetwork[];
    title?: string;
}

export enum FormBlockDataTypes {
    YANDEX = 'yandex',
    HUBSPOT = 'hubspot',
}

export enum FormBlockDirection {
    FormContent = 'form-content',
    ContentForm = 'content-form',
    Center = 'center',
}

export interface FormBlockYandexData {
    yandex: ThemeSupporting<YandexFormProps>;
}

export interface FormBlockHubspotData {
    hubspot: ThemeSupporting<HubspotFormProps>;
}

export type FormBlockData = FormBlockYandexData | FormBlockHubspotData;

export interface FormBlockProps {
    formData: FormBlockData;
    title?: string;
    textContent?: Omit<ContentBlockProps, 'centered' | 'colSizes' | 'size'>;
    direction?: FormBlockDirection;
    background?: ThemeSupporting<BackgroundImageProps>;
}

//block models
export type HeaderBlockModel = {
    type: BlockType.HeaderBlock;
} & HeaderBlockProps;

export type SliderBlockModel = {
    type: BlockType.SliderBlock;
} & SliderProps;

export type ExtendedFeaturesBlockModel = {
    type: BlockType.ExtendedFeaturesBlock;
} & ExtendedFeaturesProps;

export type PromoFeaturesBlockModel = {
    type: BlockType.PromoFeaturesBlock;
} & PromoFeaturesProps;

export type QuestionsBlockModel = {
    type: BlockType.QuestionsBlock;
} & QuestionsProps;

export type BannerBlockModel = {
    type: BlockType.BannerBlock;
} & BannerBlockProps;

export type CompaniesBlockModel = {
    type: BlockType.CompaniesBlock;
} & CompaniesBlockProps;

export type MediaBlockModel = {
    type: BlockType.MediaBlock;
} & MediaBlockProps;

export type MapBlockModel = {
    type: BlockType.MapBlock;
} & MapBlockProps;

export type InfoBlockModel = {
    type: BlockType.InfoBlock;
} & InfoBlockProps;

export type TableBlockModel = {
    type: BlockType.TableBlock;
} & TableBlockProps;

export type TabsBlockModel = {
    type: BlockType.TabsBlock;
} & TabsBlockProps;

export type CardLayoutBlockModel = {
    type: BlockType.CardLayoutBlock;
} & CardLayoutBlockProps;

export type FilterBlockModel = {
    type: BlockType.FilterBlock;
} & FilterBlockProps;

export type IconsBlockModel = {
    type: BlockType.IconsBlock;
} & IconsBlockProps;

export type HeaderSliderBlockModel = {
    type: BlockType.HeaderSliderBlock;
} & HeaderSliderBlockProps;

export type ContentLayoutBlockModel = {
    type: BlockType.ContentLayoutBlock;
} & ContentLayoutBlockProps;

export type ShareBLockModel = {
    type: BlockType.ShareBlock;
} & ShareBlockProps;

export type FormBlockModel = {
    type: BlockType.FormBlock;
} & FormBlockProps;

type BlockModels =
    | SliderBlockModel
    | ExtendedFeaturesBlockModel
    | PromoFeaturesBlockModel
    | QuestionsBlockModel
    | BannerBlockModel
    | CompaniesBlockModel
    | MediaBlockModel
    | MapBlockModel
    | InfoBlockModel
    | TableBlockModel
    | TabsBlockModel
    | HeaderBlockModel
    | IconsBlockModel
    | HeaderSliderBlockModel
    | CardLayoutBlockModel
    | ContentLayoutBlockModel
    | ShareBLockModel
    | FilterBlockModel
    | FormBlockModel;

export type Block = BlockModels & BlockBaseProps;
