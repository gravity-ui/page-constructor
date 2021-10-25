declare type SVGIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

declare module '*.svg' {
    const content: SVGIconData;

    export default content;
}

declare module 'assets/img/*.svg' {
    const path: string;

    export default path;
}

declare module '*.png' {
    const path: string;

    export default path;
}

declare module '*.md' {
    const content: string;

    export default content;
}
