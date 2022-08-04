import {ClassNameProps} from '../../models';
import {ThemeSupporting} from '../../utils';

import {
    AuthorItem,
    ButtonPixel,
    ButtonProps,
    CardBaseProps,
    CardProps,
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
import {PixelEvent} from '../common';

export enum SubBlockType {
    Divider = 'divider',
    Form = 'form',
    Card = 'card',
    Quote = 'quote',
    NewsCard = 'news-card',
    Partner = 'partner',
    PriceDetailed = 'price-detailed',
    MediaCard = 'media-card',
    BannerCard = 'banner-card',
    TutorialCard = 'tutoral-card',
    CardWithImage = 'card-with-image',
    BackgroundCard = 'background-card',
    Content = 'content',
    HubspotForm = 'hubspot-form',
    Banner = 'Banner',
}

export const SubBlockTypes = Object.values(SubBlockType);
export interface DividerProps {
    size?: DividerSize;
    border?: boolean;
}

export interface FormProps {
    id: number | string;
    metrikaGoals: string[];
    border?: boolean;
}

export interface HubspotFormProps {
    className?: string;
    region?: string;
    portalId: string;
    formId: string;
    formInstanceId?: string;
    formClassName?: string;
    onBeforeLoad?: () => void;
    onBeforeSubmit?: () => void;
    onSubmit?: () => void;
    onLoad?: () => void;
    pixelEvents?: string | string[] | PixelEvent | PixelEvent[] | ButtonPixel;
    hubspotEvents?: string[];
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
    background?: ImageObjectProps;
    paddingBottom?: 's' | 'm' | 'l' | 'xl';
    backgroundColor?: string;
}

export interface BannerProps {
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
        Pick<ContentBlockProps, 'title' | 'additionalInfo' | 'buttons' | 'theme'> {
    image: string;
    description?: string;
    disableCompress?: boolean;
    border?: boolean;
    fullScreen?: boolean;
    links?: CardWithImageLinkProps[];
}

// sub-block models
export type DividerModel = {
    type: SubBlockType.Divider;
} & DividerProps;

export type FormModel = {
    type: SubBlockType.Form;
} & FormProps;

export type CardModel = {
    type: SubBlockType.Card;
} & CardProps;

export type QuoteModel = {
    type: SubBlockType.Quote;
} & QuoteProps;

export type NewsCardModel = {
    type: SubBlockType.NewsCard;
} & NewsCardProps;

export type CardWithImageModel = {
    type: SubBlockType.CardWithImage;
} & CardWithImageProps;

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

export type BannerModel = {
    type: SubBlockType.Banner;
} & BannerProps;

export type SubBlockModels =
    | DividerModel
    | FormModel
    | CardModel
    | QuoteModel
    | NewsCardModel
    | PartnerModel
    | PriceDetailedModel
    | MediaCardModel
    | TutorialCardModel
    | CardWithImageModel
    | BackgroundCardModel
    | HubspotFormModel
    | BannerModel;

export type SubBlock = SubBlockModels;
