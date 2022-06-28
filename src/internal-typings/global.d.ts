declare module 'icons/*.svg' {
    const content: SVGIconData;

    export default content;
}

declare module '*.svg' {
    const path: string;

    export default path;
}

interface CreateFormProps {
    portalId: string;
    formId: string;
    region?: string;
    target?: string;
    cssClass?: string;
    formInstanceId?: string;
}

interface Window {
    hbspt?: {
        forms: {
            create: (args: CreateFormProps) => unknown;
        };
    };
}
