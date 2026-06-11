import transformYFM, {Options, Output} from '@diplodoc/transform';
import sanitize from 'sanitize-html';
import Typograf, {TypografRule} from 'typograf';

import {Lang} from './types';

type AddRuleOptions = TypografRule;

export enum TransformType {
    Text = 'text',
    Html = 'html',
}

interface TransformOptions extends Options {
    lang: Lang;
}

export const DEFAULT_ALLOWED_TAGS = [
    'br',
    'b',
    'i',
    'strong',
    'em',
    'sup',
    'sub',
    'a',
    'ul',
    'ol',
    'li',
];
export const typografConfig = {
    enabled: ['common/nbsp/afterNumber', 'common/nbsp/afterParagraphMark'],
    disabled: [
        'common/symbols/cf',
        'ru/other/phone-number',
        'common/space/afterColon',
        'common/space/afterSemicolon',
    ],
};
export const sanitizeStripOptions: sanitize.IOptions = {
    allowedTags: [],
    allowedAttributes: {},
};

export function addTypografRules(options: AddRuleOptions[]) {
    options.forEach((option) => {
        Typograf.addRule(option);
    });
}

function enableRules(tp: Typograf) {
    const {disabled, enabled} = typografConfig;

    enabled.forEach((rule) => tp.enableRule(rule));
    disabled.forEach((rule) => tp.disableRule(rule));
}

export function typograf(text: string, lang: Lang = 'ru') {
    const localeByLang = {
        ru: ['ru', 'en-US'],
        en: ['en-US', 'ru'],
    };

    const tp = new Typograf({
        locale: localeByLang[lang] || lang,
        htmlEntity: {type: 'name'},
    });

    enableRules(tp);

    return tp.execute(text);
}

export function sanitizeHtml(html: string, options = sanitizeStripOptions) {
    return html && sanitize(html, options || sanitizeStripOptions);
}

export function typografToHTML(text: string, lang: Lang, allowedTags = DEFAULT_ALLOWED_TAGS) {
    return text && typograf(sanitizeHtml(text, {allowedTags}), lang);
}

export function typografToText(text: string, lang: Lang) {
    return text && sanitizeHtml(typograf(text, lang));
}

const DEFAULT_MARKDOWN_OPTIONS: Partial<TransformOptions> = {
    useCommonAnchorButtons: true,
};

export const transformMarkdown = (input: string, options: TransformOptions): Output['result'] => {
    const {result} = transformYFM(input ?? '', {...DEFAULT_MARKDOWN_OPTIONS, ...options});
    return result;
};

export function fullTransform(
    input: string,
    {lang, ...options}: TransformOptions,
): Output['result'] {
    const result = transformMarkdown(input, {lang, ...options});
    const {html, title} = result;

    return {
        ...result,
        html: typograf(html, lang),
        title: title && typograf(title, lang),
    };
}

export interface TypografEntityParams {
    entity: Record<string, string>;
    fields: string[];
    lang: Lang;
    transformType: TransformType;
}

export function typografEntity({
    entity,
    fields,
    lang = 'ru',
    transformType = TransformType.Text,
}: TypografEntityParams) {
    const transformTypeMap = {
        text: typografToText,
        html: typografToHTML,
    };

    const transformer = transformTypeMap[transformType];

    fields.forEach((fieldName: string) => {
        if (entity[fieldName]) {
            // eslint-disable-next-line no-param-reassign, no-not-accumulator-reassign/no-not-accumulator-reassign
            entity[fieldName] = transformer(entity[fieldName], lang);
        }
    });

    return entity;
}
