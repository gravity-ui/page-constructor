import {I18N} from '@yandex-cloud/i18n';

import {Lang} from 'models/locale';

const KEYSET_NAME = 'blog';

export const i18n = new I18N();

export enum BlogKeysetWords {
    titleBlog = 'title_blog',
    titleBreadcrumbsBlog = 'title_breadcrumbs_blog',
    titleSuggest = 'title_suggest',
    actionShare = 'action_share',
    contextReadingTime = 'context_reading_time',
}

i18n.registerKeyset(Lang.En, KEYSET_NAME, {
    [BlogKeysetWords.titleBlog]: 'Blog',
    [BlogKeysetWords.titleBreadcrumbsBlog]: 'Blog',
    [BlogKeysetWords.titleSuggest]: 'See also',
    [BlogKeysetWords.actionShare]: 'Share',
    [BlogKeysetWords.contextReadingTime]: [
        '{{count}} min to read',
        '{{count}} mins to read',
        '{{count}} mins to read',
    ],
});

i18n.registerKeyset(Lang.Ru, KEYSET_NAME, {
    [BlogKeysetWords.titleBlog]: 'Блог',
    [BlogKeysetWords.titleBreadcrumbsBlog]: 'Блог',
    [BlogKeysetWords.titleSuggest]: 'Читать также',
    [BlogKeysetWords.actionShare]: 'Поделиться',
    [BlogKeysetWords.contextReadingTime]: [
        '{{count}} минута чтения',
        '{{count}} минуты чтения',
        '{{count}} минут чтения',
    ],
});

export const i18 = i18n.keyset(KEYSET_NAME);
