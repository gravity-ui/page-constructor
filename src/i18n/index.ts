import {I18N} from '@gravity-ui/i18n';

import {Lang} from '../models/locale';

const KEYSET_NAME = 'blog';

export const i18n = new I18N();

export enum Keyset {
    Title = 'title',
    TitleBreadcrumbs = 'title_breadcrumbs',
    TitleSuggest = 'title_suggest',
    ActionShare = 'action_share',
    ContextReadingTime = 'context_reading_time',
    ActionTryAgain = 'action_try_again',
    ActionLoadMore = 'action_load_more',
    ErrorTitle = 'error_title',
    PostLoadError = 'post_load_error',
    TitleEmptyContainer = 'title_empty_container',
    ContextEmptyContainer = 'context_empty_container',
    ButtonBegin = 'button_begin',
    ButtonFarther = 'button_farther',
    Search = 'search_placeholder',
    AllTags = 'label_all_tags',
    ActionSavedOnly = 'action_saved_only',
    AllServices = 'label_all_services',
}

i18n.registerKeyset(Lang.En, KEYSET_NAME, {
    [Keyset.Title]: 'Blog',
    [Keyset.TitleBreadcrumbs]: 'Blog',
    [Keyset.TitleSuggest]: 'See also',
    [Keyset.ActionShare]: 'Share',
    [Keyset.ActionTryAgain]: 'Try again',
    [Keyset.ActionLoadMore]: 'See more',
    [Keyset.ErrorTitle]: 'Error',
    [Keyset.PostLoadError]: "Posts didn't load",
    [Keyset.TitleEmptyContainer]: "Looks like we haven't written about that yet",
    [Keyset.ContextEmptyContainer]: 'Try different spellings or other keywords',
    [Keyset.ButtonBegin]: 'Back to top',
    [Keyset.ButtonFarther]: 'Load more',
    [Keyset.Search]: 'Search',
    [Keyset.AllTags]: 'All topics',
    [Keyset.ActionSavedOnly]: 'Saved',
    [Keyset.AllServices]: 'All Services',
    [Keyset.ContextReadingTime]: [
        '{{count}} min to read',
        '{{count}} mins to read',
        '{{count}} mins to read',
    ],
});

i18n.registerKeyset(Lang.Ru, KEYSET_NAME, {
    [Keyset.Title]: 'Блог',
    [Keyset.TitleBreadcrumbs]: 'Блог',
    [Keyset.TitleSuggest]: 'Читать также',
    [Keyset.ActionShare]: 'Поделиться',
    [Keyset.ActionTryAgain]: 'Попробуйте ещё раз',
    [Keyset.ActionLoadMore]: 'Показать ещё',
    [Keyset.ErrorTitle]: 'Произошла ошибка',
    [Keyset.PostLoadError]: 'Посты не загрузились',
    [Keyset.TitleEmptyContainer]: 'Возможно, мы об этом ещё не написали',
    [Keyset.ContextEmptyContainer]:
        'Пожалуйста, проверьте правильность написания или попробуйте другие ключевые слова',
    [Keyset.ButtonBegin]: 'В начало',
    [Keyset.ButtonFarther]: 'Дальше',
    [Keyset.Search]: 'Поиск',
    [Keyset.AllTags]: 'Все темы',
    [Keyset.ActionSavedOnly]: 'Сохранённые',
    [Keyset.AllServices]: 'Все сервисы',
    [Keyset.ContextReadingTime]: [
        '{{count}} минута чтения',
        '{{count}} минуты чтения',
        '{{count}} минут чтения',
    ],
});

export const i18 = i18n.keyset(KEYSET_NAME);
