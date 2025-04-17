export const getHostStyles = () => {
    return [...document.styleSheets]
        .map((styleSheet) => {
            try {
                return [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
            } catch {
                //eslint-disable-next-line no-console
                console.log(`Access to stylesheet  ${styleSheet.href} is denied. Ignoring...`);

                return '';
            }
        })
        .filter(Boolean)
        .join('\n');
};
