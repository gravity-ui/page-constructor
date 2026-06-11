export const a11yHiddenSvgProps = {
    // Hides element from a11y tree
    'aria-hidden': true,
};

export function svgToDataUri(svgContent: string): string {
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
}
