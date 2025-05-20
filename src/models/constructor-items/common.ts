import * as React from 'react';

import {ButtonView, ButtonProps as UikitButtonProps} from '@gravity-ui/uikit';

import {ThemeSupporting} from '../../utils';
import {AnalyticsEventsBase, AnalyticsEventsProp, ClassNameProps, QAProps} from '../common';

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

export enum CustomControlsType {
    WithMuteButton = 'with-mute-button',
    WithPlayPauseButton = 'with-play-pause-button',
}

export enum CustomControlsButtonPositioning {
    Left = 'left',
    Right = 'right',
    Center = 'center',
}

export enum MediaVideoType {
    Default = 'default',
    Player = 'player',
}

export enum MediaVideoControlsType {
    Default = 'default',
    Custom = 'custom',
}

export enum QuoteType {
    Chevron = 'chevron', // « »
    EnglishDouble = 'english-double', // “ ”
}

// types
export type TextTheme = 'light' | 'dark';
export type TextSize = 'xs' | 's' | 'sm' | 'm' | 'l';
export type DividerSize = '0' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
export type HeaderWidth = 's' | 'm' | 'l';
export type HeaderImageSize = 's' | 'm';
export type HeaderOffset = 'default' | 'large';
export type Justify = 'start' | 'center' | 'end';
export type ColumnsCount = 1 | 2 | 3 | 4;
export type LegendTableMarkerType = 'disk' | 'tick';
export type LinkTheme = 'file-link' | 'normal' | 'back' | 'underline';
export type MediaDirection = 'media-content' | 'content-media';
export type PriceDescriptionColor = 'cornflower' | 'black';
export type ContentSize = 's' | 'm' | 'l';
export type ContentTextSize = 's' | 'm' | 'l';
export type ContentTheme = 'default' | 'dark' | 'light';
export type FileLinkType = 'vertical' | 'horizontal';
export type ImageCardMargins = 's' | 'm';
export type LayoutItemContentMargin = 'm' | 'l';

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

export interface Roleable {
    role?: React.AriaRole;
}

export interface AriaProps {
    ariaProps?: React.AriaAttributes;
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

export enum Device {
    Desktop = 'desktop',
    Mobile = 'mobile',
    Tablet = 'tablet',
}

export interface ImageInfoProps
    extends Pick<
            React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
            'aria-describedby' | 'loading'
        >,
        ImageDevicesVisibleProps {
    alt?: string;
    fetchPriority?: 'high' | 'low' | 'auto';
    disableCompress?: boolean;
}

export interface ImageObjectProps extends ImageInfoProps {
    src: string;
}

export interface ImageDeviceProps extends ImageInfoProps {
    [Device.Desktop]: string;
    [Device.Mobile]: string;
    [Device.Tablet]?: string;
}

export interface ImageDevicesVisibleProps {
    hide?: boolean | Partial<Record<Device, boolean>>;
}

export type ImageProps = string | ImageObjectProps | ImageDeviceProps;
export type ThemedImage = ThemeSupporting<ImageProps>;

export interface BackgroundImageProps
    extends React.HTMLProps<HTMLDivElement>,
        Partial<ImageDeviceProps>,
        Partial<ImageObjectProps>,
        QAProps,
        ImageDevicesVisibleProps {
    style?: React.CSSProperties;
    imageClassName?: string;
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
    customControlsOptions?: CustomControlsOptions;
    ariaLabel?: string;
    contain?: boolean;
}

// links
export interface LinkProps extends AnalyticsEventsBase, Stylable, Tabbable {
    url: string;
    urlTitle?: string;
    text?: string;
    textSize?: TextSize;
    theme?: LinkTheme;
    colorTheme?: TextTheme;
    arrow?: boolean;
    target?: string;
    extraProps?: React.HTMLProps<HTMLAnchorElement>;
}

export interface FileLinkProps extends ClassNameProps, Tabbable {
    href: string;
    text: React.ReactNode;
    type?: FileLinkType;
    textSize?: TextSize;
    theme?: ContentTheme;
    urlTitle?: string;
    onClick?: () => void;
    extraProps?: React.HTMLProps<HTMLAnchorElement>;
}

// buttons
export type ButtonTheme =
    | ButtonView
    | 'github'
    | 'app-store'
    | 'google-play'
    | 'scale'
    | 'monochrome';

export interface ButtonProps
    extends AnalyticsEventsBase,
        Pick<UikitButtonProps, 'size' | 'width' | 'extraProps'> {
    text: string;
    url: string;
    urlTitle?: string;
    primary?: boolean;
    theme?: ButtonTheme;
    img?: ButtonImageProps | string;
    target?: string;
}

export type ButtonImagePosition = 'left' | 'right';

export interface ButtonImageProps {
    url: string;
    position?: ButtonImagePosition;
    alt?: string;
}

export interface CustomControlsOptions {
    type?: CustomControlsType;
    muteButtonShown?: boolean;
    positioning?: CustomControlsButtonPositioning;
}

export interface PlayButtonProps extends ClassNameProps {
    type?: PlayButtonType;
    theme?: PlayButtonThemes;
    text?: string;
}

export type ThemedMediaVideoProps = ThemeSupporting<MediaVideoProps>;

export interface MediaComponentVideoProps extends AnalyticsEventsBase {
    video: MediaVideoProps;
    height?: number;
    ratio?: number | 'auto';
    previewImg?: string;
}

export interface MediaComponentVideoIframeProps {
    videoIframe: string;
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
    disableImageSliderForArrayInput?: boolean;
}

export interface MediaComponentDataLensProps {
    dataLens: DataLensProps;
}

export interface MediaComponentIframeProps {
    iframe: IframeProps;
    margins?: boolean;
}

export interface MediaProps
    extends Animatable,
        Partial<MediaComponentDataLensProps>,
        Partial<MediaComponentYoutubeProps>,
        Partial<MediaComponentVideoIframeProps>,
        Partial<MediaComponentImageProps>,
        Partial<MediaComponentIframeProps>,
        Partial<MediaComponentVideoProps> {
    color?: string;
    videoMicrodata?: {
        name?: string;
        description?: string;
        duration?: string;
        uploadDate?: string;
        contentUrl?: string;
        thumbnailUrl?: string;
    };
}

export interface BackgroundMediaProps extends MediaProps, Animatable, QAProps {
    fullWidthMedia?: boolean;
    className?: string;
    mediaClassName?: string;
}

export type Coordinate = number[];

export interface MapBaseProps {
    zoom?: number;
    className?: string;
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

export interface DataLensObjectProps {
    id: string;
    theme: 'dark' | 'light';
}

export interface IframeProps {
    src: string;
    width?: number;
    height?: number;
    title?: string;
    name?: string;
}

export type DataLensProps = string | DataLensObjectProps;

export interface AuthorItem {
    firstName: string;
    secondName: string;
    description?: string;
    avatar?: ThemeSupporting<ImageProps> | JSX.Element;
}

export interface HeaderBreadCrumbsProps extends ClassNameProps {
    items: {
        url: string;
        text: React.ReactNode;
    }[];
    theme?: TextTheme;
    analyticsEvents?: AnalyticsEventsProp;
}

export interface TitleItemProps extends Justifyable, TitleItemBaseProps {
    navTitle?: string;
    anchor?: string;
}

export interface TitleItemBaseProps {
    text: string;
    textSize?: TextSize;
    url?: string;
    urlTitle?: string;
    custom?: string | React.ReactNode;
    onClick?: () => void;
}

export type MediaView = 'fit' | 'full';

// card
export type MediaBorder = 'shadow' | 'line' | 'none';
export type CardBorder = MediaBorder;
export type ControlPosition = 'content' | 'footer';

export interface CardBaseProps {
    border?: CardBorder;
}

export type CardLayoutProps = {
    controlPosition?: ControlPosition;
};

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

export interface PriceItemProps
    extends PriceDetailsProps,
        PriceDescriptionProps,
        AnalyticsEventsBase {}

export interface PriceFoldableDetailsProps {
    title: string;
    size?: TextSize;
    titleColor?: PriceDescriptionColor;
}

/** @deprecated */
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
    theme?: ContentTheme;
}

export interface TitleProps {
    title?: TitleItemProps | string;
    subtitle?: string;
}

export interface YandexFormProps extends AnalyticsEventsBase {
    id: number | string;
    containerId?: string;
    theme?: string;
    className?: string;
    headerHeight?: number;
    customFormOrigin?: string;
    customFormSection?: string;
    params?: {[key: string]: string};

    onSubmit?: () => void;
    onLoad?: () => void;
}

export interface WithBorder {
    border?: MediaBorder;
    /**
     * @deprecated use custom class for media-component
     */
    disableShadow?: boolean;
}
