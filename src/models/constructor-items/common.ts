import {CSSProperties, ReactNode} from 'react';

import {ButtonView, ButtonProps as UikitButtonProps} from '@gravity-ui/uikit';

import {ThemeSupporting} from '../../utils';
import {AnalyticsEventsBase, ClassNameProps, PixelEventType, QAProps} from '../common';

// enums
export enum AuthorType {
    Column = 'column',
    Line = 'line',
}

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

export enum PlayButtonType {
    Default = 'default',
    Text = 'text',
}

export enum PlayButtonThemes {
    Blue = 'blue',
    Grey = 'grey',
}

export enum MediaVideoType {
    Default = 'default',
    Player = 'player',
}

export enum MediaVideoControlsType {
    Default = 'default',
    Custom = 'custom',
}

// types
export type TextTheme = 'light' | 'dark';
export type TextSize = 'xs' | 's' | 'm' | 'l';
export type DividerSize = '0' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
export type HeaderWidth = 's' | 'm' | 'l';
export type HeaderImageSize = 's' | 'm';
export type HeaderOffset = 'default' | 'large';
export type Justify = 'start' | 'center' | 'end';
export type ColumnsCount = 1 | 2 | 3 | 4;
export type LegendTableMarkerType = 'disk';
export type LinkTheme = 'file-link' | 'normal' | 'back' | 'underline';
export type MediaDirection = 'media-content' | 'content-media';
export type PriceDescriptionColor = 'cornflower' | 'black';
export type ContentSize = 's' | 'l';
export type ContentTextSize = 's' | 'm' | 'l';
export type ContentTheme = 'default' | 'dark' | 'light';
export type FileLinkType = 'vertical' | 'horizontal';

// modifiers
export interface Themable {
    theme?: TextTheme;
}

export interface Justifyable {
    justify?: Justify;
}

export interface Stylable {
    className?: string;
}

export interface Animatable {
    animated?: boolean;
}

export interface Tabbable {
    tabIndex?: number;
}

//common props
export interface Background {
    image?: string;
    color?: string;
}

export interface AnchorProps {
    text: string;
    url: string;
}

/**
 * @deprecated Component VideoBlock will be deleted, which uses this logic
 */
interface LoopProps {
    start: number;
    end?: number;
}

// images

export interface ImageInfoProps {
    alt?: string;
    disableCompress?: boolean;
}

export interface ImageObjectProps extends ImageInfoProps {
    src: string;
}

export interface ImageDeviceProps extends ImageInfoProps {
    desktop: string;
    mobile: string;
    tablet?: string;
}

export type ImageProps = string | ImageObjectProps | ImageDeviceProps;
export type ThemedImage = ThemeSupporting<ImageProps>;

export interface BackgroundImageProps
    extends React.HTMLProps<HTMLDivElement>,
        Partial<ImageDeviceProps>,
        Partial<ImageObjectProps>,
        QAProps {
    style?: CSSProperties;
    imageClassName?: string;
    hide?: boolean;
}

//components props
export interface MediaVideoProps extends AnalyticsEventsBase {
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

// links
export interface LinkProps extends AnalyticsEventsBase, Stylable, Tabbable {
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

export interface FileLinkProps extends ClassNameProps, Tabbable {
    href: string;
    text: ReactNode;
    type?: FileLinkType;
    textSize?: TextSize;
    theme?: ContentTheme;
    onClick?: () => void;
}

// buttons
export type ButtonTheme =
    | ButtonView
    | 'github'
    | 'app-store'
    | 'google-play'
    | 'scale'
    | 'monochrome';

export interface ButtonProps extends AnalyticsEventsBase, Pick<UikitButtonProps, 'size' | 'width'> {
    text: string;
    url: string;
    primary?: boolean;
    theme?: ButtonTheme;
    img?: ButtonImageProps | string;
    metrikaGoals?: MetrikaGoal;
    pixelEvents?: ButtonPixel;
    target?: string;
}

export type ButtonImagePosition = 'left' | 'right';

export interface ButtonImageProps {
    url: string;
    position?: ButtonImagePosition;
    alt?: string;
}

export interface PlayButtonProps extends ClassNameProps {
    type?: PlayButtonType;
    theme?: PlayButtonThemes;
    text?: string;
}

// media
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
    ariaLabel?: string;
}

export type ThemedMediaVideoProps = ThemeSupporting<MediaVideoProps>;

export interface MediaComponentVideoProps extends AnalyticsEventsBase {
    video: MediaVideoProps;
    height?: number;
    metrika?: MetrikaVideo;
    previewImg?: string;
}

export interface MediaComponentYoutubeProps {
    youtube: string;
    previewImg?: string;
    fullscreen?: boolean;
}

export interface MediaComponentImageProps {
    image: ImageProps | ImageProps[] | ImageDeviceProps;
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

export interface BackgroundMediaProps extends MediaProps, Animatable {
    fullWidthMedia?: boolean;
    className?: string;
    mediaClassName?: string;
}

export type Coordinate = number[];

export interface MapBaseProps {
    zoom?: number;
}

export interface GMapProps extends MapBaseProps {
    address: string;
}

export interface YMapProps extends MapBaseProps {
    markers: YMapMarker[];
    id: string;
}

export interface YMapMarker {
    address?: string;
    coordinate?: Coordinate;
    label?: YMapMarkerLabel;
}

export interface YMapMarkerLabel {
    iconCaption?: string;
    iconContent?: string;
    iconColor?: string;
    preset?: string;
}

export type MapProps = GMapProps | YMapProps;

export type ThemedMediaProps = ThemeSupporting<MediaProps>;

// metrika
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

export interface DataLensObjectProps {
    id: string;
    theme: 'dark' | 'light';
}

export type DataLensProps = string | DataLensObjectProps;

export interface AuthorItem {
    firstName: string;
    secondName: string;
    description?: string;
    avatar?: string | JSX.Element;
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

export interface TitleItemProps extends Justifyable, TitleItemBaseProps {
    navTitle?: string;
    anchor?: string;
}

export interface TitleItemBaseProps {
    text: string;
    textSize?: TextSize;
    url?: string;
    custom?: string | ReactNode;
    onClick?: () => void;
}

// card
export type CardBorder = 'shadow' | 'line' | 'none';

export interface CardBaseProps {
    border?: CardBorder;
}

//price
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

export interface PriceDetailsSettingsProps {
    title: string;
    description: string;
}

export interface PriceDetailsListProps {
    text: string;
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

export interface AuthorProps extends QAProps {
    author: AuthorItem;
    className?: string;
    authorContainerClassName?: string;
    type?: AuthorType;
}

export interface TitleProps {
    title?: TitleItemProps | string;
    subtitle?: string;
}
