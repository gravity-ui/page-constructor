import {ClassNameProps} from '../../models';
import {ThemeSupporting} from '../../utils';
import {HubspotEventData, HubspotEventHandlers} from '../../utils/hubspot';

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
import {ContentBlockProps} from './blocks';
import {AnalyticsEventsBase, PixelEvent} from '../common';

export enum SubBlockType {
    Divider = 'divider',
    Quote = 'quote',
    NewsCard = 'news-card',
    /**
     * @deprecated Will be moved to params use BasicCard instead
     */
    Partner = 'partner',
    PriceDetailed = 'price-detailed',
    MediaCard = 'media-card',
    BannerCard = 'banner-card',
    /**
     * @deprecated Will be moved to params use BasicCard instead
     */
    TutorialCard = 'tutoral-card',
    /**
     * @deprecated Use LayoutItem
     */
    CardWithImage = 'card-with-image',
    LayoutItem = 'layout-item',
    BackgroundCard = 'background-card',
    BasicCard = 'basic-card',
    Content = 'content',
    HubspotForm = 'hubspot-form',
    /**
     * @deprecated Will be moved to params use BasicCard instead
     */
    Card = 'card',
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
export interface PartnerProps extends CardBaseProps {
    text: string;
    logo: ImageProps;
    url: string;
}
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
    background?: ThemeSupporting<ImageObjectProps>;
    paddingBottom?: 's' | 'm' | 'l' | 'xl';
    backgroundColor?: string;
}

export interface BasicCardProps
    extends CardBaseProps,
        Omit<ContentBlockProps, 'colSizes' | 'centered' | 'size' | 'theme'> {
    url: string;
    icon?: ImageProps;
    target?: string;
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

export interface MediaCardProps extends MediaProps, CardBaseProps {}

export interface CardWithImageLinkProps extends Omit<LinkProps, 'text' | 'url'> {
    title: string;
    link: string;
}

export interface CardWithImageProps
    extends ClassNameProps,
        Pick<CardBaseProps, 'tags'>,
        Pick<ContentBlockProps, 'title' | 'additionalInfo' | 'buttons' | 'theme'> {
    image: string;
    description?: string;
    disableCompress?: boolean;
    border?: boolean;
    fullScreen?: boolean;
    links?: CardWithImageLinkProps[];
}

export interface LayoutItemProps extends ClassNameProps {
    content: Omit<ContentBlockProps, 'colSizes' | 'centered' | 'size'>;
    media: MediaProps;
    metaInfo?: string[];
    border?: boolean;
    fullScreen?: boolean;
}

// sub-block models
export type DividerModel = {
    type: SubBlockType.Divider;
} & DividerProps;

export type QuoteModel = {
    type: SubBlockType.Quote;
} & QuoteProps;

export type NewsCardModel = {
    type: SubBlockType.NewsCard;
} & NewsCardProps;

export type CardWithImageModel = {
    type: SubBlockType.CardWithImage;
} & CardWithImageProps;

export type LayoutItemModel = {
    type: SubBlockType.CardWithImage;
} & LayoutItemProps;

export type TutorialCardModel = {
    type: SubBlockType.TutorialCard;
} & TutorialCardProps;

export type BackgroundCardModel = {
    type: SubBlockType.BackgroundCard;
} & BackgroundCardProps;

export type PartnerModel = {
    type: SubBlockType.Partner;
} & PartnerProps;

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
    | NewsCardModel
    | PartnerModel
    | PriceDetailedModel
    | MediaCardModel
    | TutorialCardModel
    | CardWithImageModel
    | BackgroundCardModel
    | HubspotFormModel
    | BannerCardModel
    | BasicCardModel;

export type SubBlock = SubBlockModels;
