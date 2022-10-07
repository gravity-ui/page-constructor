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
}

i18n.registerKeyset(Lang.En, KEYSET_NAME, {
    [BlogKeyset.TitleBlog]: 'Blog',
    [BlogKeyset.TitleBreadcrumbsBlog]: 'Blog',
    [BlogKeyset.TitleSuggest]: 'See also',
    [BlogKeyset.ActionShare]: 'Share',
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
    [BlogKeyset.ContextReadingTime]: [
        '{{count}} минута чтения',
        '{{count}} минуты чтения',
        '{{count}} минут чтения',
    ],
});

export const i18 = i18n.keyset(KEYSET_NAME);
