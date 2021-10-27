declare module '*.svg' {
    const content: SVGIconData;

    export default content;
}

declare let __IS_SERVER__: boolean;
