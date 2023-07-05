import {useLayoutEffect, useState} from 'react';

export const useDocumentCSS = () => {
    const [css, setCss] = useState('');

    useLayoutEffect(() => {
        const result = [...document.styleSheets]
            .map((styleSheet) => {
                try {
                    return [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
                } catch (e) {
                    console.log(`Access to stylesheet  ${styleSheet.href} is denied. Ignoring...`);

                    return '';
                }
            })
            .filter(Boolean)
            .join('\n');

        setCss(result);
    }, []);

    return css;
};
