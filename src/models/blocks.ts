import React, {CSSProperties, ReactNode} from 'react';
import {ButtonSize, ButtonView} from '@yandex-cloud/uikit';
import {SocialNetwork} from '@yandex-data-ui/common';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {EventPublic, ServicePublic} from '@yandex-data-ui/cloud-schemas/build/models/ui-api';

import {Lang, PixelEvent, PixelEventType} from './common';
import {ThemeSupporting, isV2BlockType} from '../utils';
import {GridColumnSize, GridColumnSizesType} from '../grid/types';
import {HubspotEventData, HubspotEventHandlers} from '../utils/hubspot';

export enum BlockType {
    Header = 'header',
    HeaderBreadcrumbs = 'header-breadcrumbs',
    Text = 'text',
    Section = 'section',
    Container = 'container',
    Button = 'button',
    Foladable = 'foldable',
    Image = 'image',
    LegendTable = 'legend-table',
    Share = 'share',
    Title = 'title',
    Divider = 'divider',
    Features = 'features',
    Tabs = 'tabs',
    Link = 'link',
    FileLink = 'file-link',
    Table = 'table',
    Scrollable = 'scrollable',
    Tiles = 'tiles',
    Form = 'form',
    Card = 'card',
    Quote = 'quote',
    Event = 'event',
    NewsCard = 'news-card',
    Partner = 'partner',
    PriceDetailed = 'price-detailed',
    ServiceCard = 'service-card',
    ServicePreviewCard = 'service-preview-card',
    MediaCard = 'media-card',
    BannerCard = 'banner-card',
    TutorialCard = 'tutoral-card',
    CardWithImage = 'card-with-image',
    BackgroundCard = 'background-card',
    Content = 'content',
    Author = 'author',
    HubspotForm = 'hubspot-form',

    PromoFeaturesBlock = 'promo-features-block',
    ExtendedFeaturesBlock = 'extended-features-block',
    SliderBlock = 'slider-block',
    CalculatorBlock = 'calculator-block',
    ServiceDemoBlock = 'service-demo-block',
    QuestionsBlock = 'questions-block',
    BannerBlock = 'banner-block',
    CompaniesBlock = 'companies-block',
    MediaBlock = 'media-block',
    PreviewBlock = 'preview-block',
    InfoBlock = 'info-block',
    SecurityBlock = 'security-block',
    TableBlock = 'table-block',
    TabsBlock = 'tabs-block',
    SimpleBlock = 'simple-block',
    HeaderSliderBlock = 'header-slider-block',
    LinkTableBlock = 'link-table-block',
    HeaderBlock = 'header-block',
    IconsBlock = 'icons-block',
    CardLayoutBlock = 'card-layout-block',
    ContentLayoutBlock = 'content-layout-block',
}

export const BlockV2Types = Object.values(BlockType).filter((type) => isV2BlockType(type));
export const HeaderBlockTypes = [
    BlockType.Header,
    BlockType.HeaderSliderBlock,
    BlockType.HeaderBlock,
];

export enum PriceDetailsType {
    MARKED_LIST = 'marked-list',
    SETTINGS = 'settings',
}

export enum PriceLabelColor {
    BLUE = 'blue',
    GREEN = 'green',
    YELLOW = 'yellow',
    PURPLE = 'purple',
    RED = 'red',
}

export enum PreviewItemType {
    Video = 'video',
    Image = 'image',
}

export type TextTheme = 'light' | 'dark';
export type TextSize = 's' | 'm' | 'l';
export type DividerSize = '0' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
export type HeaderWidth = 's' | 'm' | 'l';
export type HeaderImageSize = 's' | 'm';
export type HeaderOffset = 'default' | 'large';
export type Justify = 'start' | 'center' | 'end';
export type ColumnsCount = 1 | 2 | 3 | 4;
export type LegendTableMarkerType = 'disk';
export type TilesColumns = Partial<Record<GridColumnSize, ColumnsCount>>;
export type LinkTheme = 'file-link' | 'normal' | 'back' | 'underline';
export type MediaDirection = 'media-content' | 'content-media';
export type PriceDescriptionColor = 'cornflower' | 'black';
export type PreviewRatioMediaContent = '2-1' | '1-1';
export type ContentSize = 's' | 'l';
export type ContentTextSize = 's' | 'm' | 'l';
export type ContentTheme = 'default' | 'dark' | 'light';
export type FileLinkType = 'vertical' | 'horizontal';

export interface Background {
    image?: string;
    color?: string;
}

export interface Themable {
    theme?: TextTheme;
}

export interface Justifyable {
    justify?: Justify;
}

export interface Stylable {
    className?: string;
}

export interface Childable {
    children?: Block[];
}

export interface Animatable {
    animated?: boolean;
}

export interface BlockHeaderProps {
    title?: TitleProps | string;
    description?: string;
}

export enum PlayButtonType {
    Default = 'default',
    Text = 'text',
}

export enum PlayButtonThemes {
    Blue = 'blue',
    Grey = 'grey',
}

export interface PlayButtonProps extends ClassNameProps {
    type?: PlayButtonType;
    theme?: PlayButtonThemes;
    text?: string;
}

export enum MediaVideoType {
    Default = 'default',
    Player = 'player',
}

export enum MediaVideoControlsType {
    Default = 'default',
    Custom = 'custom',
}

/**
 * @deprecated Сomponent VideoBlock will be deleted, which uses this logic
 */
interface LoopProps {
    start: number;
    end?: number;
}

export interface MediaVideoProps {
    src: string[];
    type?: MediaVideoType;
    loop?: LoopProps | boolean;
    muted?: boolean;
    autoplay?: boolean;
    elapsedTime?: number;
    playButton?: PlayButtonProps;
    controls?: MediaVideoControlsType;
    metrika?: MetrikaVideo;
}

export type ThemedMediaVideoProps = ThemeSupporting<MediaVideoProps>;

export interface MediaComponentVideoProps {
    video: MediaVideoProps;
    height?: number;
    metrika?: MetrikaVideo;
    previewImg?: string;
}

export interface MediaComponentYoutubeProps {
    youtube: string;
    previewImg?: string;
}

export interface MediaComponentImageProps {
    image: ImageProps | ImageProps[];
    video?: MediaVideoProps;
    parallax?: boolean;
    height?: number;
}

export interface MediaComponentDataLensProps {
    dataLens: DataLensProps;
}

export interface MediaProps
    extends Animatable,
        Partial<MediaComponentDataLensProps>,
        Partial<MediaComponentYoutubeProps>,
        Partial<MediaComponentImageProps>,
        Partial<MediaComponentVideoProps> {
    color?: string;
}

export type ThemedMediaProps = ThemeSupporting<MediaProps>;

export interface LoadableProps {
    source: string;
    serviceId?: number;
}

export interface LoadableChildren {
    loadable?: LoadableProps;
}

export interface TitleBaseProps {
    text: string;
    textSize?: TextSize;
    url?: string;
    custom?: string | ReactNode;
    onClick?: () => void;
}

export interface AnchorProps {
    text: string;
    url: string;
}

export interface ImageObjectProps {
    src: string;
    alt?: string;
    disableCompress?: boolean;
}

export interface DataLensObjectProps {
    id: string;
    theme: 'dark' | 'light';
}

export type DataLensProps = string | DataLensObjectProps;

export type ImageProps = string | ImageObjectProps;
export type ThemedImage = ThemeSupporting<ImageProps>;

export interface BlockBaseProps {
    anchor?: AnchorProps;
    visible?: GridColumnSize;
    resetPaddings?: boolean;
}

export interface TileItem {
    text: string;
    icon?: string;
    url?: string;
}

export interface AuthorItem {
    firstName: string;
    secondName: string;
    description?: string;
    avatar?: string | JSX.Element;
}

export interface QuoteItem extends Themable {
    text: string;
    image: string;
    logo: string;
    color?: string;
    url?: string;
    author?: AuthorItem;
}

export enum AuthorType {
    Column = 'column',
    Line = 'line',
}

export interface AuthorProps {
    author: AuthorItem;
    className?: string;
    type?: AuthorType;
}

export interface CardHeader {
    title?: string;
    image?: ImageProps;
}

export interface CardData {
    header?: CardHeader;
    text?: string;
    title?: string;
    link?: LinkProps;
    footer?: string;
    url?: string;
    service?: {slug: string; name: string};
    links?: LinkProps[];
}

export interface CardBaseProps {
    border?: CardBorder;
}

export interface CardProps extends CardBaseProps, CardData {}

export interface QuoteProps extends Themable, CardBaseProps {
    text: string;
    image: ThemedImage;
    logo: string;
    color?: string;
    url?: string;
    author?: AuthorItem;
    buttonText?: string;
    theme?: TextTheme;
}

export interface PartnerProps extends CardBaseProps {
    text: string;
    logo: ImageProps;
    url: string;
}

export interface PriceDetailsSettingsProps {
    title: string;
    description: string;
}

export interface PriceDetailsListProps {
    text: string;
}

export interface PriceDescriptionProps {
    title: string;
    detailedTitle?: string;
    description: string;
    label?: {
        color: PriceLabelColor;
        text?: string;
        size?: TextSize;
    };
}

export interface PriceDetailsProps {
    items?: PriceDetailsSettingsProps[] | PriceDetailsListProps[];
}

export interface PriceItemProps extends PriceDetailsProps, PriceDescriptionProps {}

export interface PriceFoldableDetailsProps {
    title: string;
    size?: TextSize;
    titleColor?: PriceDescriptionColor;
}

export interface PriceDetailedProps extends CardBaseProps {
    items: PriceItemProps[];
    description?: {
        titleSize?: TextSize;
        descriptionSize?: TextSize;
        titleColor?: PriceDescriptionColor;
    };
    details?: {
        titleSize?: TextSize;
        descriptionSize?: TextSize;
    };
    priceType?: PriceDetailsType;
    numberGroupItems?: 3 | 4 | 5;
    isCombined?: boolean;
    useMixedView?: boolean;
    foldable?: PriceFoldableDetailsProps;
    labelsDefaultText?: Record<PriceLabelColor, string>;
}

export type CardBorder = 'shadow' | 'line' | 'none';

export type ServiceDemoProps = Animatable;

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
    title?: TitleBaseProps;
    description?: string;
    autoplay?: number;
    //for server transforms
    randomOrder?: boolean;
    adaptive?: boolean;
}

export type CalculatorProps = Animatable;

export interface ContainerProps extends Childable, Justifyable {
    sizes?: GridColumnSizesType;
    hidden?: GridColumnSize;
    visible?: GridColumnSize;
    offsets?: GridColumnSizesType;
    sticky?: boolean;
}

export interface SectionProps extends ContainerProps, Themable {
    background?: Background;
    anchor?: string;
}

export interface NewMetrikaGoal {
    name: string;
    isCrossSite?: boolean;
    counterName?: string;
    params?: Record<string, string>;
}

export type MetrikaGoal = string | string[] | NewMetrikaGoal[];

export interface MetrikaVideo {
    counterName?: string;
    play?: MetrikaGoal;
    stop?: MetrikaGoal;
}

export interface ButtonPixelEvent {
    name: PixelEventType;
    data?: Object;
}

export type ButtonPixel = ButtonPixelEvent[];

export interface ButtonProps {
    text: string;
    url: string;
    primary?: boolean;
    size?: ButtonSize;
    theme?: ButtonView | 'github' | 'app-store' | 'google-play' | 'scale' | 'monochrome';
    img?: ButtonImageProps | string;
    metrikaGoals?: MetrikaGoal;
    pixelEvents?: ButtonPixel;
    target?: string;
}

export interface ButtonImageProps {
    url: string;
    position?: 'left' | 'right';
    alt?: string;
}

export interface SimpleBlockProps extends Animatable, Childable {
    title: TitleBaseProps;
    description: string;
}

export interface FeaturesProps {
    border?: boolean;
    columns?: ColumnsCount;
    items: string[];
}

export interface ExtendedFeaturesItem {
    title?: string;
    text?: string;
    label?: string;
    icon?: string;
    link?: LinkProps;
}

export interface ExtendedFeaturesProps extends Animatable {
    items: ExtendedFeaturesItem[];
    title?: TitleProps | string;
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
    title?: TitleProps | string;
    description?: string;
    theme?: 'grey' | 'default';
}

export interface TilesProps {
    items: TileItem[];
    columns?: TilesColumns;
}

export interface TabsProps extends Childable {
    titles: string[];
}

export interface QuestionItem {
    title: string;
    text: string;
    listStyle?: 'dash' | 'disk';
    link?: LinkProps;
}

export interface QuestionsProps {
    title: string;
    items: QuestionItem[];
}

export interface HeaderProps extends Themable, Childable {
    title: string;
    image?: string;
    subtitle?: string;
    color?: string;
    background?: Background;
    width?: HeaderWidth;
    children?: Block[];
}

export interface HeaderSliderBlockProps extends Omit<SliderProps, 'title' | 'description'> {
    items: HeaderBlockProps[];
}

export interface TextProps extends Justifyable {
    text: string;
    folded?: string;
    footnote?: boolean;
}

export interface LinkProps extends Stylable {
    url: string;
    text?: string;
    textSize?: TextSize;
    theme?: LinkTheme;
    colorTheme?: TextTheme;
    arrow?: boolean;
    target?: string;
    metrikaGoals?: MetrikaGoal;
    pixelEvents?: ButtonPixel;
}

export interface ShareProps {
    items: SocialNetwork[];
    title?: string;
}

export interface DividerProps {
    size?: DividerSize;
    border?: boolean;
}

export interface TitleProps extends Justifyable, TitleBaseProps {
    navTitle?: string;
    anchor?: string;
}

export interface ImageBlockProps {
    src: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
}

export interface TableProps {
    content: string[][];
    legend?: string[];
    justify?: Justify[];
    marker?: LegendTableMarkerType;
}

export interface ScrollableProps extends Childable {
    itemOffset?: number;
}

export interface FormProps {
    id: number | string;
    metrikaGoals: string[];
    border?: boolean;
}

export interface EventProps extends EventPublic, CardBaseProps {
    className?: string;
    fullSize?: boolean;
    lang?: Lang;
}

export interface NewsCardData {
    id: number;
    slug: string;
    title: string;
    date: string;
    url: string;
    isoDate?: string;
}

export type NewsCardProps = Pick<NewsCardData, 'title' | 'url' | 'date' | 'isoDate'> &
    CardBaseProps;

export interface TutorialCardProps extends CardBaseProps {
    url: string;
    title: string;
    text: string;
    icon?: ImageProps;
}

export interface BackgroundCardProps
    extends CardBaseProps,
        Omit<ContentBlockProps, 'colSizes' | 'centered'> {
    url?: string;
    background?: ImageObjectProps;
    paddingBottom?: 's' | 'm' | 'l' | 'xl';
    backgroundColor?: string;
}

export interface BannerBlockProps extends Animatable {
    title: string;
    subtitle?: string;
    image?: ThemeSupporting<string>;
    disableCompress?: boolean;
    color?: ThemeSupporting<string>;
    theme?: TextTheme;
    button: Pick<ButtonProps, 'text' | 'url' | 'target'>;
}

export interface CompaniesBlockProps extends Animatable {
    title: string;
    images: ThemeSupporting<{
        desktop: string;
        tablet: string;
        mobile: string;
        alt?: string;
    }>;
}

export interface MediaContentProps {
    title: string;
    description?: string;
    additionalInfo?: string;
    button?: ButtonProps;
    links?: LinkProps[];
    buttons?: ButtonProps[];
    size?: ContentSize;
}

export interface MediaBlockProps extends Animatable, MediaContentProps {
    media: ThemeSupporting<MediaProps>;
    direction?: MediaDirection;
    mobileDirection?: MediaDirection;
    largeMedia?: boolean;
    mediaOnly?: boolean;
    disableShadow?: boolean;
}

export interface PreviewContentItemProps {
    title: string;
    description?: string;
}

export interface PreviewItemProps {
    type: PreviewItemType;
    media: ThemedMediaProps;
    content: PreviewContentItemProps;
}

export interface PreviewBlockProps extends Animatable {
    title: string;
    items: PreviewItemProps[];
    description?: string;
    direction?: MediaDirection;
    ratioMediaContent?: PreviewRatioMediaContent;
    stopVideo?: boolean;
    showImmediately?: boolean;
}

export interface InfoBlockProps {
    theme?: TextTheme;
    backgroundColor?: ThemeSupporting<string>;
    title: string;
    buttons?: Pick<ButtonProps, 'url' | 'text' | 'theme'>[];
    sectionsTitle: string;
    links?: Pick<LinkProps, 'text' | 'url'>[];
}

export interface ServiceCardItem {
    name: string;
    id: string;
    url: string;
}

export interface ServiceCardProps extends CardBaseProps {
    title: string;
    description: string;
    services: ServiceCardItem[];
    link?: {
        text: string;
        url: string;
    };
}

export type ServicePreviewCardProps = Pick<
    ServicePublic,
    'slug' | 'name' | 'description' | 'tag' | 'status' | 'docUrl' | 'pricesUrl'
> &
    CardBaseProps;

export interface MediaCardProps extends MediaProps, CardBaseProps {}

export interface SecurityBlockPoint {
    img: string;
    text: string;
    link: {
        text: string;
        url: string;
    };
}

export interface SecurityBlockProps extends Animatable {
    theme?: TextTheme;
    backgroundColor?: string;
    title: string;
    points?: SecurityBlockPoint[];
    media: MediaProps;
}

export interface TableBlockProps {
    title: string;
    table: TableProps;
}

export interface TabsBlockItem {
    tabName: string;
    title: string;
    text: string;
    link?: LinkProps;
    image?: ThemedImage;
    disableCompress?: boolean;
    caption?: string;
    media?: ThemedMediaProps;
    links?: LinkProps[];
}

export interface TabsBlockProps extends BlockHeaderProps, Animatable {
    items: TabsBlockItem[];
}

export interface LinkTableBlockProps extends BlockHeaderProps {
    items: LinkProps[][];
    linkTheme?: LinkTheme;
}

export interface CardWithImageLinkProps extends Omit<LinkProps, 'text' | 'url'> {
    title: string;
    link: string;
}

export type ExcludedCardImageProps = 'text' | 'size' | 'links' | 'colSizes' | 'centered';

export interface CardWithImageProps
    extends ClassNameProps,
        Omit<ContentBlockProps, ExcludedCardImageProps> {
    image: string;
    description?: string;
    disableCompress?: boolean;
    border?: boolean;
    fullScreen?: boolean;
    links?: CardWithImageLinkProps[];
}

export interface CardLayoutBlockProps extends Childable, Animatable, LoadableChildren {
    title: TitleProps | string;
    description?: string;
    colSizes?: GridColumnSizesType;
}

export interface IconsBlockProps {
    title?: string;
    size: 's' | 'm' | 'l';
    items: {
        url: string;
        text: string;
        src: string;
    }[];
}

export interface HeaderBreadCrumbsProps extends ClassNameProps {
    items: {
        url: string;
        text: ReactNode;
    }[];
    theme?: TextTheme;
    metrikaGoals?: MetrikaGoal;
    pixelEvents?: ButtonPixel;
}

export interface BackgroundImageProps extends React.HTMLProps<HTMLDivElement> {
    src?: string;
    alt?: string;
    disableCompress?: boolean;
    style?: CSSProperties;
    imageClassName?: string;
    hide?: boolean;
}

interface HeaderBackgroundProps {
    color?: string;
    url?: string;
    disableCompress?: boolean;
}

export interface HeaderBlockBackground extends Partial<HeaderBackgroundProps>, Partial<MediaProps> {
    fullWidth?: boolean;
}

export type ThemedHeaderBlockBackground = ThemeSupporting<HeaderBlockBackground>;

export function headerHasMediaBackground(
    background: HeaderBlockBackground,
): background is MediaProps {
    return 'image' in background || 'video' in background || 'youtube' in background;
}

export interface HeaderBlockProps {
    title: string;
    overtitle?: string;
    description?: string;
    buttons?: Pick<ButtonProps, 'url' | 'text' | 'theme' | 'primary' | 'size'>[];
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
    background?: ThemedHeaderBlockBackground;
    theme?: 'light' | 'dark';
    verticalOffset?: 's' | 'm' | 'l' | 'xl';
    breadcrumbs?: HeaderBreadCrumbsProps;
    status?: JSX.Element;
}

export interface FileLinkProps extends ClassNameProps {
    href: string;
    text: ReactNode;
    type?: FileLinkType;
    textSize?: TextSize;
    theme?: ContentTheme;
    onClick?: () => void;
}

export interface ContentLayoutBlockProps {
    properties?: {
        size?: ContentSize;
        background?: BackgroundImageProps;
        centered?: boolean;
        theme?: ContentTheme;
        textWidth?: ContentTextSize;
    };
    textContent: ContentBlockProps;
    fileContent?: FileLinkProps[];
}

export interface ContentBlockProps {
    title?: TitleBaseProps | string;
    text?: string;
    additionalInfo?: string;
    links?: LinkProps[];
    buttons?: ButtonProps[];
    size?: ContentSize;
    colSizes?: GridColumnSizesType;
    centered?: boolean;
    theme?: ContentTheme;
}

export interface HubspotFormProps extends HubspotEventHandlers {
    className?: string;
    theme?: ContentTheme;
    isMobile?: boolean;
    region?: string;
    portalId: string;
    formId: string;
    formInstanceId?: string;
    formClassName?: string;

    /**
     * To use this handler for component that is rendered in iframe, set up useLoopBackHubspotEvents hook on top level frame
     */
    onBeforeLoad?: (arg: HubspotEventData) => void;

    /**
     * To use this handler for component that is rendered in iframe, set up useLoopBackHubspotEvents hook on top level frame
     */
    onBeforeSubmit?: (arg: HubspotEventData) => void;

    /**
     * To use this handler for component that is rendered in iframe, set up useLoopBackHubspotEvents hook on top level frame
     */
    onSubmit?: (arg: HubspotEventData) => void;

    /**
     * To use this handler for component that is rendered in iframe, set up useLoopBackHubspotEvents hook on top level frame
     */
    onLoad?: (arg: HubspotEventData) => void;
    pixelEvents?: string | string[] | PixelEvent | PixelEvent[] | ButtonPixel;
    hubspotEvents?: string[];
}

export type AuthorModel = {
    type: BlockType.Author;
} & AuthorProps;

export type HeaderBlockModel = {
    type: BlockType.HeaderBlock;
} & HeaderBlockProps;

export type HeaderModel = {
    type: BlockType.Header;
} & HeaderProps;

export type ButtonModel = {
    type: BlockType.Button;
} & ButtonProps;

export type ContainerModel = {
    type: BlockType.Container;
} & ContainerProps;

export type SectionModel = {
    type: BlockType.Section;
} & SectionProps;

export type TextModel = {
    type: BlockType.Text;
} & TextProps;

export type TitleModel = {
    type: BlockType.Title;
} & TitleProps;

export type DividerModel = {
    type: BlockType.Divider;
} & DividerProps;

export type FeaturesModel = {
    type: BlockType.Features;
} & FeaturesProps;

export type ImageModel = {
    type: BlockType.Image;
} & ImageBlockProps;

export type TabsModel = {
    type: BlockType.Tabs;
} & TabsProps;

export type ShareModel = {
    type: BlockType.Share;
} & ShareProps;

export type LinkModel = {
    type: BlockType.Link;
} & LinkProps;

export type TableModel = {
    type: BlockType.Table;
} & TableProps;

export type ScrollableModel = {
    type: BlockType.Table;
} & ScrollableProps;

export type TilesModel = {
    type: BlockType.Tiles;
} & TilesProps;

export type FormModel = {
    type: BlockType.Form;
} & FormProps;

export type CardModel = {
    type: BlockType.Card;
} & CardProps;

export type QuoteModel = {
    type: BlockType.Quote;
} & QuoteProps;

export type EventModel = {
    type: BlockType.Event;
} & EventProps;

export type NewsCardModel = {
    type: BlockType.NewsCard;
} & NewsCardProps;

export type CardWithImageModel = {
    type: BlockType.CardWithImage;
} & CardWithImageProps;

export type TutorialCardModel = {
    type: BlockType.TutorialCard;
} & TutorialCardProps;

export type BackgroundCardModel = {
    type: BlockType.BackgroundCard;
} & BackgroundCardProps;

export type PartnerModel = {
    type: BlockType.Partner;
} & PartnerProps;

export type PriceDetailedModel = {
    type: BlockType.PriceDetailed;
} & PriceDetailedProps;

export type ServiceCardModel = {
    type: BlockType.ServiceCard;
} & ServiceCardProps;

export type ServicePreviewCardModel = {
    type: BlockType.ServicePreviewCard;
} & ServicePreviewCardProps;

export type MediaCardModel = {
    type: BlockType.MediaCard;
} & MediaCardProps;

export type CalculatorBlockModel = {
    type: BlockType.CalculatorBlock;
} & CalculatorProps;

export type SliderBlockModel = {
    type: BlockType.SliderBlock;
} & SliderProps;

export type ServiceDemoBlockModel = {
    type: BlockType.ServiceDemoBlock;
} & ServiceDemoProps;

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

export type PreviewBlockModel = {
    type: BlockType.PreviewBlock;
} & PreviewBlockProps;

export type InfoBlockModel = {
    type: BlockType.InfoBlock;
} & InfoBlockProps;

export type SecurityBlockModel = {
    type: BlockType.SecurityBlock;
} & SecurityBlockProps;

export type TableBlockModel = {
    type: BlockType.TableBlock;
} & TableBlockProps;

export type TabsBlockModel = {
    type: BlockType.TabsBlock;
} & TabsBlockProps;

export type SimpleBlockModel = {
    type: BlockType.SimpleBlock;
} & SimpleBlockProps;

export type LinkTableBlockModel = {
    type: BlockType.LinkTableBlock;
} & LinkTableBlockProps;

export type CardLayoutBlockModel = {
    type: BlockType.CardLayoutBlock;
} & CardLayoutBlockProps;

export type IconsBlockModel = {
    type: BlockType.IconsBlock;
} & IconsBlockProps;

export type HeaderSliderBlockModel = {
    type: BlockType.HeaderSliderBlock;
} & HeaderSliderBlockProps;

export type ContentLayoutBlockModel = {
    type: BlockType.ContentLayoutBlock;
} & ContentLayoutBlockProps;

export type HubspotFormBlockModel = {
    type: BlockType.HubspotForm;
} & HubspotFormProps;

export type BlockV1Raw =
    | HeaderModel
    | ButtonModel
    | ContainerModel
    | SectionModel
    | TextModel
    | TitleModel
    | DividerModel
    | FeaturesModel
    | ImageModel
    | TabsModel
    | ShareModel
    | LinkModel
    | ScrollableModel
    | TableModel
    | TilesModel
    | FormModel
    | CardModel
    | QuoteModel
    | EventModel
    | NewsCardModel
    | PartnerModel
    | PriceDetailedModel
    | ServiceCardModel
    | MediaCardModel
    | TutorialCardModel
    | CardWithImageModel
    | BackgroundCardModel;

type BlockV2Raw =
    | SliderBlockModel
    | ServiceDemoBlockModel
    | ExtendedFeaturesBlockModel
    | PromoFeaturesBlockModel
    | QuestionsBlockModel
    | CalculatorBlockModel
    | BannerBlockModel
    | CompaniesBlockModel
    | MediaBlockModel
    | InfoBlockModel
    | SecurityBlockModel
    | TableBlockModel
    | TabsBlockModel
    | SimpleBlockModel
    | LinkTableBlockModel
    | HeaderBlockModel
    | PreviewBlockModel
    | IconsBlockModel
    | HeaderSliderBlockModel
    | CardLayoutBlockModel
    | HubspotFormBlockModel
    | ContentLayoutBlockModel;

export type BlockV1 = BlockV1Raw;
export type BlockV2 = BlockV2Raw & BlockBaseProps;
export type Block = BlockV1 | BlockV2;

export function isV2Block(block: Block): block is BlockV2 {
    return BlockV2Types.includes(block.type);
}

export function isNewMetrikaFormat(metrika: MetrikaGoal): metrika is NewMetrikaGoal[] {
    return Boolean(Array.isArray(metrika) && metrika.length && typeof metrika[0] === 'object');
}
