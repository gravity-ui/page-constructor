import {
    BackgroundImageProps,
    ButtonProps,
    ContentSize,
    ContentTextSize,
    ContentTheme,
    FileLinkProps,
    HeaderBreadCrumbsProps,
    HeaderImageSize,
    HeaderOffset,
    HeaderWidth,
    Justify,
    LinkProps,
    LinkTheme,
    MediaDirection,
    MediaProps,
    PreviewItemProps,
    PreviewRatioMediaContent,
    TextSize,
    TextTheme,
    ThemedImage,
    ThemedMediaProps,
    ThemedMediaVideoProps,
    TitleProps,
    LegendTableMarkerType,
    AnchorProps,
    TitleBaseProps,
    Animatable,
    BlockHeaderProps,
} from './common';
import {ThemeSupporting} from '../../utils';
import {GridColumnSize, GridColumnSizesType} from '../../grid/types';
import {BannerProps, SubBlock} from './sub-blocks';

export enum BlockType {
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

export const BlockTypes = Object.values(BlockType);
export const HeaderBlockTypes = [BlockType.HeaderSliderBlock];
export interface Childable {
    children?: SubBlock[];
}

//block props
export interface BlockBaseProps {
    anchor?: AnchorProps;
    visible?: GridColumnSize;
    resetPaddings?: boolean;
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

export interface HeaderSliderBlockProps extends Omit<SliderProps, 'title' | 'description'> {
    items: HeaderBlockProps[];
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

export type CalculatorProps = Animatable;

export interface SimpleBlockProps extends Animatable, Childable {
    title: TitleBaseProps;
    description: string;
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

export interface BannerBlockProps extends BannerProps, Animatable {}

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

export interface TableProps {
    content: string[][];
    legend?: string[];
    justify?: Justify[];
    marker?: LegendTableMarkerType;
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

//block models
export type HeaderBlockModel = {
    type: BlockType.HeaderBlock;
} & HeaderBlockProps;

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

type BlockModels =
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
    | ContentLayoutBlockModel;

export type Block = BlockModels & BlockBaseProps;
