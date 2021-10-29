declare module '*.svg' {
    const path: string;

    export default path;
}

declare module 'icons/*.svg' {
    const content: SVGIconData;

    export default content;
}
