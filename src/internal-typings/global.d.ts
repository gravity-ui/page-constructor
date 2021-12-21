declare module 'icons/*.svg' {
    const content: SVGIconData;

    export default content;
}

declare module '*.svg' {
    const path: string;

    export default path;
}
