import {type Extension, yfmFileNodeName} from '@gravity-ui/markdown-editor';

const isSafeFileHref = (href: unknown): href is string => {
    if (typeof href !== 'string' || !href.trim()) return false;

    try {
        // A fixed HTTP(S) base allows relative URLs without relying on the document location.
        const {protocol} = new URL(href, 'https://relative.invalid');
        return protocol === 'https:' || protocol === 'http:';
    } catch {
        return false;
    }
};

export const safeYfmFile: Extension = (builder) => {
    builder.overrideNodeSpec(yfmFileNodeName, (spec) => ({
        ...spec,
        toDOM(node) {
            if (isSafeFileHref(node.attrs.href) && spec.toDOM) {
                return spec.toDOM(node);
            }

            return ['span', {class: 'yfm-file'}, String(node.attrs.download ?? '')];
        },
    }));
};
