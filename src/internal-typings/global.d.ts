declare module 'assets/images/*.svg' {
    const path: string;

    export default path;
}

declare module '*.svg' {
    const content: SVGIconData;

    export default content;
}
