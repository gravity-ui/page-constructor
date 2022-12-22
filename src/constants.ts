export const BREAKPOINTS = {
    xs: 0,
    sm: 577,
    md: 769,
    lg: 1081,
    xl: 1185,
};

export const KEY_CODES = {
    ARROW_LEFT: 37,
    ARROW_TOP: 38,
    ARROW_RIGHT: 39,
    ARROW_BOTTOM: 40,
    ENTER: 13,
    SPACE: 32,
    ESC: 27,
};

export const DEFAULT_THEME = 'light';

export enum BlogMetrikaGoalIds {
    shareTop = 'SITE_BLOG_SHARE-TOP_CLICK',
    shareBottom = 'SITE_BLOG_SHARE-BOTTOM_CLICK',
    breadcrumbsTop = 'SITE_BLOG_BREADCRUMBS-TOP_CLICK',
    breadcrumbsBottom = 'SITE_BLOG_BREADCRUMBS-BOTTOM_CLICK',
    saveTop = 'SITE_BLOG_SAVE-TOP_CLICK',
    saveBottom = 'SITE_BLOG_SAVE-BOTTOM_CLICK',
    suggest = 'SITE_BLOG_INTERESTING-CARD_CLICK',
    bannerCommon = 'SITE_BLOG_TEXT-BANNER_CLICK',
    cta = 'SITE_BLOG_CTA_CLICK',
    tag = 'SITE_BLOG_THEME-SELECTOR_CLCK',
    service = 'SITE_BLOG_SERVICE-SELECTOR_CLCK',
    showMore = 'SITE_BLOG-PAGINATION_SHOW-MORE_CLCK',
    next = 'SITE_BLOG-PAGINATION_NEXT_CLCK',
    home = 'SITE_BLOG-PAGINATION_HOME_CLCK',
    page = 'SITE_BLOG-PAGINATION_PAGE-NMBR_CLCK',
}
