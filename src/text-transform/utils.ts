import Typograf from 'typograf';
import sanitize from 'sanitize-html';
import transformYFM, {Options, Output} from '@doc-tools/transform';
import {Lang} from '../models/common';

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
    disabled: ['common/symbols/cf'],
};
export const sanitizeStripOptions: sanitize.IOptions = {
    allowedTags: [],
    allowedAttributes: {},
};

Typograf.addRule({
    name: 'common/html/sup',
    queue: 'end',
    /* TODO mange with it: in typograf types AddRuleOptions.handler takes only one param: text.
    But in cloud-www was used this notation with 3 params */
    //@ts-ignore
    handler: function (text, settings, context) {
        const {prefs: {htmlEntity: {type = ''} = {}} = {}} = context;

        let symbols;
        switch (type) {
            case 'digit':
                symbols = '&#174;|&#169;|&#8482;';
                break;
            case 'name':
                symbols = '&reg;|&copy;|&trade;';
                break;
            default:
                symbols = '®|©|™';
                break;
        }

        const symbolsRegex = new RegExp(
            `(?<!<sup>\\s*)(${symbols})|(${symbols})(?!\\s*<\\/sup>)`,
            'gi',
        );

        return text.replace(symbolsRegex, '<sup>$1</sup>');
    },
    htmlAttrs: false,
});

function enableRules(tp: typograf.Typograf) {
    const {disabled, enabled} = typografConfig;

    enabled.forEach((rule) => tp.enableRule(rule));
    disabled.forEach((rule) => tp.disableRule(rule));
}

export function typograf(text: string, lang = Lang.Ru) {
    const localeByLang = {
        [Lang.Ru]: ['ru', 'en-US'],
        [Lang.En]: ['en-US', 'ru'],
    };

    const tp = new Typograf({
        locale: localeByLang[lang],
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

export const transformMarkdown = (input = '', options: TransformOptions): Output['result'] => {
    const {result} = transformYFM(input, options);
    return result;
};

export function fullTransform(input = '', {lang, ...options}: TransformOptions): Output['result'] {
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
    lang = Lang.Ru,
    transformType = TransformType.Text,
}: TypografEntityParams) {
    const transformTypeMap = {
        text: typografToText,
        html: typografToHTML,
    };

    const transformer = transformTypeMap[transformType];

    fields.forEach((fieldName: string) => {
        if (entity[fieldName]) {
            entity[fieldName] = transformer(entity[fieldName], lang);
        }
    });

    return entity;
}
