import {sanitize} from 'isomorphic-dompurify';

const sanitizeStripOptions = {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
};

export function sanitizeHtml(html?: string) {
    return html && sanitize(html, sanitizeStripOptions);
}
