import {I18N} from '@gravity-ui/i18n';

import {Lang} from '../models/locale';

const KEYSET_NAME = 'blog';

export const i18n = new I18N();

export enum BlogKeyset {
    TitleBlog = 'title_blog',
    TitleBreadcrumbsBlog = 'title_breadcrumbs_blog',
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
    [BlogKeyset.TitleBlog]: 'Blog',
    [BlogKeyset.TitleBreadcrumbsBlog]: 'Blog',
    [BlogKeyset.TitleSuggest]: 'See also',
    [BlogKeyset.ActionShare]: 'Share',
    [BlogKeyset.ActionTryAgain]: 'Try again',
    [BlogKeyset.ActionLoadMore]: 'See more',
    [BlogKeyset.ErrorTitle]: 'Error',
    [BlogKeyset.PostLoadError]: "Posts didn't load",
    [BlogKeyset.TitleEmptyContainer]: "Looks like we haven't written about that yet",
    [BlogKeyset.ContextEmptyContainer]: 'Try different spellings or other keywords',
    [BlogKeyset.ButtonBegin]: 'Back to top',
    [BlogKeyset.ButtonFarther]: 'Load more',
    [BlogKeyset.Search]: 'Search',
    [BlogKeyset.AllTags]: 'All topics',
    [BlogKeyset.ActionSavedOnly]: 'Saved',
    [BlogKeyset.AllServices]: 'All Services',
    [BlogKeyset.ContextReadingTime]: [
        '{{count}} min to read',
        '{{count}} mins to read',
        '{{count}} mins to read',
    ],
});

i18n.registerKeyset(Lang.Ru, KEYSET_NAME, {
    [BlogKeyset.TitleBlog]: 'Блог',
    [BlogKeyset.TitleBreadcrumbsBlog]: 'Блог',
    [BlogKeyset.TitleSuggest]: 'Читать также',
    [BlogKeyset.ActionShare]: 'Поделиться',
    [BlogKeyset.ActionTryAgain]: 'Попробуйте ещё раз',
    [BlogKeyset.ActionLoadMore]: 'Показать ещё',
    [BlogKeyset.ErrorTitle]: 'Произошла ошибка',
    [BlogKeyset.PostLoadError]: 'Посты не загрузились',
    [BlogKeyset.TitleEmptyContainer]: 'Возможно, мы об этом ещё не написали',
    [BlogKeyset.ContextEmptyContainer]:
        'Пожалуйста, проверьте правильность написания или попробуйте другие ключевые слова',
    [BlogKeyset.ButtonBegin]: 'В начало',
    [BlogKeyset.ButtonFarther]: 'Дальше',
    [BlogKeyset.Search]: 'Поиск',
    [BlogKeyset.AllTags]: 'Все темы',
    [BlogKeyset.ActionSavedOnly]: 'Сохранённые',
    [BlogKeyset.AllServices]: 'Все сервисы',
    [BlogKeyset.ContextReadingTime]: [
        '{{count}} минута чтения',
        '{{count}} минуты чтения',
        '{{count}} минут чтения',
    ],
});

export const i18 = i18n.keyset(KEYSET_NAME);
