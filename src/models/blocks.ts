import {ReactNode} from 'react';
import {ButtonSize, ButtonView, SocialNetwork} from '@yandex-data-ui/common';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {EventPublic, ServicePublic} from '@yandex-data-ui/cloud-schemas/build/models/ui-api';

import {Lang, PixelEventType} from './common';
import {GridColumnSize, GridColumnSizesType} from '../grid';
import {SlidesToShow} from '../blocks/Slider/models';

export enum BlockType {
    Header = 'header',
    HeaderWithImage = 'header-with-image',
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
    Table = 'table',
    Scrollable = 'scrollable',
    Tiles = 'tiles',
    Form = 'form',
    Quotes = 'quotes',
    Card = 'card',
    Quote = 'quote',
    Event = 'event',
    Post = 'post',
    Partner = 'partner',
    PriceDetailed = 'price-detailed',
    ServiceCard = 'service-card',
    ServicePreviewCard = 'service-preview-card',
    MediaCard = 'media-card',
    BannerCard = 'banner-card',
    TutorialCard = 'tutoral-card',

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
    TextTableBlock = 'text-table-block',
    SimpleBlock = 'simple-block',
    HeaderSliderBlock = 'header-slider-block',
    ServicesBlock = 'services-block',
    LinkTableBlock = 'link-table-block',
}

export const BlockV2Types = Object.values(BlockType).filter((type) => type.includes('-block'));
export const HeaderBlockTypes = [BlockType.Header];

export enum PriceDetailsType {
    MARKED_LIST = 'marked-list',
    SETTINGS = 'settings',
}

export enum PriceLabelColor {
    BLUE = 'blue',
    GREEN = 'green',
    YELLOW = 'yellow',
    PURPLE = 'purple',
}

export enum PreviewItemType {
    Video = 'video',
    Image = 'image',
}

export type Theme = 'light' | 'dark';
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
export type ServicesBlockSize = 's' | 'm';
export type PreviewRatioMediaContent = '2-1' | '1-1';

export interface Background {
    image?: string;
    color?: string;
}

export interface Themable {
    theme?: Theme;
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

export interface AdaptiveProps {
    desktopOnly?: boolean;
    mobileOnly?: boolean;
}

export interface BlockHeader {
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

export interface MediaProps extends Animatable {
    color?: string;
    image?: ImageProps | ImageProps[];
    parallax?: boolean;
    video?: MediaVideoProps;
    youtube?: string;
    previewImg?: string;
    height?: number;
    metrika?: MetrikaVideo;
}

export interface LoadableProps {
    source: string;
    minCount?: number;
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

export interface Anchor {
    text: string;
    url: string;
}

export interface ImageObjectProps {
    src: string;
    alt?: string;
    disableCompress?: boolean;
}

export type ImageProps = string | ImageObjectProps;

export interface BlockBaseProps {
    anchor?: Anchor;
    visible?: GridColumnSize;
    resetPaddings?: boolean;
}

export interface TileItem {
    text: string;
    icon?: string;
    url?: string;
}

export interface Author {
    firstName: string;
    secondName: string;
    description?: string;
    avatar?: string;
}

export interface QuoteItem extends Themable {
    text: string;
    image: string;
    logo: string;
    color?: string;
    url?: string;
    author?: Author;
}

export type QuotesProps = {
    items: QuoteItem[];
};

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
    image: ImageProps;
    logo: string;
    color?: string;
    url?: string;
    author?: Author;
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

export type CardBorder = 'shadow' | 'line';

export type ServiceDemoProps = Animatable;

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

export interface MetrikaGoal {
    name: string;
    isCrossSite?: boolean;
    counterName?: string;
    params?: Record<string, string>;
}

export type Metrika = string | string[] | MetrikaGoal[];

export interface MetrikaVideo {
    counterName?: string;
    play?: Metrika;
    stop?: Metrika;
}

export interface PixelEvent {
    name: PixelEventType;
    data?: Object;
}

export type ButtonPixel = PixelEvent[];

export interface ButtonProps {
    text: string;
    url: string;
    primary?: boolean;
    size?: ButtonSize;
    theme?: ButtonView | 'github' | 'app-store' | 'google-play' | 'scale';
    img?: ButtonImageProps | string;
    metrikaGoals?: Metrika;
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
    link?: Link;
    label?: string;
    icon?: string;
}

export interface ExtendedFeaturesProps extends Animatable {
    items: ExtendedFeaturesItem[];
    title?: TitleProps | string;
    description?: string;
    colSizes?: GridColumnSizesType;
}

interface PromoFeaturesItem {
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
    link?: Link;
    listStyle?: 'dash' | 'disk';
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

export type HeaderWithImageProps = Omit<
    HeaderProps,
    keyof Themable | 'background' | 'width' | 'color'
>;

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
    colorTheme?: Theme;
    arrow?: boolean;
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

export interface PostData {
    id: number;
    slug: string;
    title: string;
    date: string;
    url: string;
}

export interface PostProps extends PostData, CardBaseProps {}

export interface TutorialCardProps extends CardBaseProps {
    url: string;
    title: string;
    text: string;
}

export interface BannerBlockProps extends Animatable {
    title: string;
    subtitle?: string;
    image?: string;
    disableCompress?: boolean;
    color?: string;
    theme?: Theme;
    button: Pick<ButtonProps, 'text' | 'url' | 'target'>;
}

export interface CompaniesBlockProps extends Animatable {
    title: string;
    images: {
        desktop: string;
        tablet: string;
        mobile: string;
        alt?: string;
    };
}

export interface MediaBlockProps extends Animatable {
    title: string;
    description?: string;
    media: MediaProps;
    button: Pick<ButtonProps, 'text' | 'url'>;
    direction?: MediaDirection;
    mobileDirection?: MediaDirection;
    largeMedia?: boolean;
    mediaOnly?: boolean;
    links?: LinkProps[];
    disableShadow?: boolean;
}

export interface PreviewContentItemProps {
    title: string;
    description?: string;
}

export interface PreviewItemProps {
    type: PreviewItemType;
    media: MediaProps;
    content: PreviewContentItemProps;
}

export interface PreviewBlockProps extends Animatable {
    title: string;
    items: PreviewItemProps[];
    description?: string;
    direction?: MediaDirection;
    ratioMediaContent?: PreviewRatioMediaContent;
}

export interface InfoBlockProps {
    theme?: Theme;
    backgroundColor?: string;
    title: string;
    buttons?: Pick<Button, 'url' | 'text' | 'theme'>[];
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
    theme?: Theme;
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
    image?: ImageProps;
    caption?: string;
    media?: MediaProps;
    links?: LinkProps[];
}

export interface TabsBlockProps extends BlockHeader, Animatable {
    items: TabsBlockItem[];
}

export interface TextTableBlockProps extends Animatable {
    title?: TitleProps;
    description?: string;
    content: string;
    button: ButtonProps;
}

export interface ServicesBlockProps extends BlockHeader {
    size?: ServicesBlockSize;
}

export interface LinkTableBlockProps extends BlockHeader {
    items: LinkProps[][];
    linkTheme?: LinkTheme;
}

export type Header = {
    type: BlockType.Header;
} & HeaderProps;

export type Button = {
    type: BlockType.Button;
} & ButtonProps;

export type Container = {
    type: BlockType.Container;
} & ContainerProps;

export type Section = {
    type: BlockType.Section;
} & SectionProps;

export type Text = {
    type: BlockType.Text;
} & TextProps;

export type Title = {
    type: BlockType.Title;
} & TitleProps;

export type Divider = {
    type: BlockType.Divider;
} & DividerProps;

export type Features = {
    type: BlockType.Features;
} & FeaturesProps;

export type Image = {
    type: BlockType.Image;
} & ImageBlockProps;

export type Tabs = {
    type: BlockType.Tabs;
} & TabsProps;

export type Share = {
    type: BlockType.Share;
} & ShareProps;

export type Link = {
    type: BlockType.Link;
} & LinkProps;

export type Table = {
    type: BlockType.Table;
} & TableProps;

export type Scrollable = {
    type: BlockType.Table;
} & ScrollableProps;

export type Tiles = {
    type: BlockType.Tiles;
} & TilesProps;

export type Form = {
    type: BlockType.Form;
} & FormProps;

export type Quotes = {
    type: BlockType.Quotes;
} & QuotesProps;

export type Card = {
    type: BlockType.Card;
} & CardProps;

export type Quote = {
    type: BlockType.Quote;
} & QuoteProps;

export type Event = {
    type: BlockType.Event;
} & EventProps;

export type Post = {
    type: BlockType.Post;
} & PostProps;

export type TutorialCard = {
    type: BlockType.TutorialCard;
} & TutorialCardProps;

export type Partner = {
    type: BlockType.Partner;
} & PartnerProps;

export type PriceDetailed = {
    type: BlockType.PriceDetailed;
} & PriceDetailedProps;

export type ServiceCard = {
    type: BlockType.ServiceCard;
} & ServiceCardProps;

export type ServicePreviewCard = {
    type: BlockType.ServicePreviewCard;
} & ServicePreviewCardProps;

export type MediaCard = {
    type: BlockType.MediaCard;
} & MediaCardProps;

export type CalculatorBlock = {
    type: BlockType.CalculatorBlock;
} & CalculatorProps;

export type SliderBlock = {
    type: BlockType.SliderBlock;
} & SliderProps;

export type ServiceDemoBlock = {
    type: BlockType.ServiceDemoBlock;
} & ServiceDemoProps;

export type ExtendedFeaturesBlock = {
    type: BlockType.ExtendedFeaturesBlock;
} & ExtendedFeaturesProps;

export type PromoFeaturesBlock = {
    type: BlockType.PromoFeaturesBlock;
} & ExtendedFeaturesProps;

export type QuestionsBlock = {
    type: BlockType.QuestionsBlock;
} & QuestionsProps;

export type BannerBlock = {
    type: BlockType.BannerBlock;
} & BannerBlockProps;

export type CompaniesBlock = {
    type: BlockType.BannerBlock;
} & CompaniesBlockProps;

export type MediaBlock = {
    type: BlockType.MediaBlock;
} & MediaBlockProps;

export type PreviewBlock = {
    type: BlockType.PreviewBlock;
} & PreviewBlockProps;

export type InfoBlock = {
    type: BlockType.InfoBlock;
} & InfoBlockProps;

export type SecurityBlock = {
    type: BlockType.SecurityBlock;
} & SecurityBlockProps;

export type TableBlock = {
    type: BlockType.TableBlock;
} & TableBlockProps;

export type TabsBlock = {
    type: BlockType.TabsBlock;
} & TabsBlockProps;

export type TextTableBlock = {
    type: BlockType.TextTableBlock;
} & TextTableBlockProps;

export type SimpleBlock = {
    type: BlockType.SimpleBlock;
} & SimpleBlockProps;

export type ServicesBlock = {
    type: BlockType.ServicesBlock;
} & ServicesBlockProps;

export type LinkTableBlock = {
    type: BlockType.LinkTableBlock;
} & LinkTableBlockProps;

export type BlockV1Raw =
    | Header
    | Button
    | Container
    | Section
    | Text
    | Title
    | Divider
    | Features
    | Image
    | Tabs
    | Share
    | Link
    | Scrollable
    | Table
    | Tiles
    | Form
    | Quotes
    | Card
    | Quote
    | Event
    | Post
    | Partner
    | PriceDetailed
    | ServiceCard
    | MediaCard;

type BlockV2Raw =
    | SliderBlock
    | ServiceDemoBlock
    | ExtendedFeaturesBlock
    | PromoFeaturesBlock
    | QuestionsBlock
    | CalculatorBlock
    | BannerBlock
    | CompaniesBlock
    | MediaBlock
    | InfoBlock
    | SecurityBlock
    | TableBlock
    | TabsBlock
    | TextTableBlock
    | SimpleBlock
    | ServicesBlock
    | LinkTableBlock;

export type BlockV1 = BlockV1Raw & AdaptiveProps;
export type BlockV2 = BlockV2Raw & BlockBaseProps & AdaptiveProps;
export type Block = BlockV1 | BlockV2;

export function isV2Block(block: Block): block is BlockV2 {
    return BlockV2Types.includes(block.type);
}

export function isNewMetrikaFormat(metrika: Metrika): metrika is MetrikaGoal[] {
    return Boolean(Array.isArray(metrika) && metrika.length && typeof metrika[0] === 'object');
}
