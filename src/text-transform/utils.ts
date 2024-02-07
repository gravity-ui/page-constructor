import transformYFM, {Options, Output} from '@doc-tools/transform';
import {Lang} from '@gravity-ui/uikit';
import sanitize from 'sanitize-html';
import Typograf from 'typograf';

import AddRuleOptions = typograf.AddRuleOptions;

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

export const transformMarkdown = (input: string, options: TransformOptions): Output['result'] => {
    const {result} = transformYFM(input ?? '', options);
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
            // eslint-disable-next-line no-param-reassign, no-not-accumulator-reassign/no-not-accumulator-reassign
            entity[fieldName] = transformer(entity[fieldName], lang);
        }
    });

    return entity;
}
