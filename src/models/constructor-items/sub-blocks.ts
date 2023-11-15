import {ClassNameProps, QuoteType} from '../../models';
import {ThemeSupporting} from '../../utils';
import {HubspotEventData, HubspotEventHandlers} from '../../utils/hubspot';
import {AnalyticsEventsBase, PixelEvent} from '../common';

import {ContentBlockProps} from './blocks';
import {
    AuthorItem,
    ButtonPixel,
    ButtonProps,
    CardBaseProps,
    ContentTheme,
    DividerSize,
    ImageObjectProps,
    ImageProps,
    LinkProps,
    MediaProps,
    PriceDetailedProps,
    TextTheme,
    Themable,
    ThemedImage,
} from './common';

export enum SubBlockType {
    Divider = 'divider',
    Quote = 'quote',
    /**
     * @deprecated Will be removed
     */
    PriceDetailed = 'price-detailed',
    MediaCard = 'media-card',
    BannerCard = 'banner-card',
    LayoutItem = 'layout-item',
    BackgroundCard = 'background-card',
    BasicCard = 'basic-card',
    Content = 'content',
    HubspotForm = 'hubspot-form',
    /**
     * @deprecated Will be removed, use BasicCard instead
     */
    Card = 'card',
}

export enum IconPosition {
    Top = 'top',
    Left = 'left',
}

export const SubBlockTypes = Object.values(SubBlockType);

export interface DividerProps {
    size?: DividerSize;
    border?: boolean;
}

export interface HubspotFormProps extends HubspotEventHandlers, AnalyticsEventsBase {
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
    createDOMElement?: boolean;
}

//cards
export interface QuoteProps extends Themable, CardBaseProps {
    text: string;
    image: ThemedImage;
    logo: ImageProps;
    color?: string;
    url?: string;
    urlTitle?: string;
    author?: AuthorItem;
    buttonText?: string;
    theme?: TextTheme;
    quoteType?: QuoteType;
}

export interface BackgroundCardProps
    extends CardBaseProps,
        AnalyticsEventsBase,
        Omit<ContentBlockProps, 'colSizes' | 'centered'> {
    url?: string;
    urlTitle?: string;
    background?: ThemeSupporting<ImageObjectProps>;
    paddingBottom?: 's' | 'm' | 'l' | 'xl';
    backgroundColor?: string;
}

export interface BasicCardProps
    extends CardBaseProps,
        AnalyticsEventsBase,
        Omit<ContentBlockProps, 'colSizes' | 'centered' | 'size' | 'theme'> {
    url: string;
    urlTitle?: string;
    icon?: ImageProps;
    target?: string;
    iconPosition?: IconPosition;
}

export interface BannerCardProps {
    title: string;
    subtitle?: string;
    image?: ThemeSupporting<string>;
    disableCompress?: boolean;
    color?: ThemeSupporting<string>;
    theme?: TextTheme;
    button: Pick<ButtonProps, 'text' | 'url' | 'target'>;
}

export interface MediaCardProps extends MediaProps, AnalyticsEventsBase, CardBaseProps {}

export interface PriceCardProps extends CardBaseProps, Pick<ContentBlockProps, 'theme'> {
    title: string;
    price: string;
    pricePeriod?: string;
    priceDetails?: string;
    description?: string;
    button?: ButtonProps;
    link?: LinkProps;
    backgroundColor?: string;
    list?: string[];
}

export interface LayoutItemProps extends ClassNameProps, AnalyticsEventsBase {
    content: Omit<ContentBlockProps, 'colSizes' | 'centered' | 'size'>;
    media: MediaProps;
    metaInfo?: string[];
    border?: boolean;
    fullscreen?: boolean;
}

// sub-block models
export type DividerModel = {
    type: SubBlockType.Divider;
} & DividerProps;

export type QuoteModel = {
    type: SubBlockType.Quote;
} & QuoteProps;

export type LayoutItemModel = {
    type: SubBlockType.LayoutItem;
} & LayoutItemProps;

export type BackgroundCardModel = {
    type: SubBlockType.BackgroundCard;
} & BackgroundCardProps;

export type PriceDetailedModel = {
    type: SubBlockType.PriceDetailed;
} & PriceDetailedProps;

export type MediaCardModel = {
    type: SubBlockType.MediaCard;
} & MediaCardProps;

export type HubspotFormModel = {
    type: SubBlockType.HubspotForm;
} & HubspotFormProps;

export type BannerCardModel = {
    type: SubBlockType.BannerCard;
} & BannerCardProps;

export type BasicCardModel = {
    type: SubBlockType.BasicCard;
} & BasicCardProps;

export type SubBlockModels =
    | DividerModel
    | QuoteModel
    | PriceDetailedModel
    | MediaCardModel
    | BackgroundCardModel
    | HubspotFormModel
    | BannerCardModel
    | BasicCardModel
    | LayoutItemModel;

export type SubBlock = SubBlockModels;
