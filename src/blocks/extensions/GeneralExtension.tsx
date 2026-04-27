import * as React from 'react';

import {ThemeProvider} from '@gravity-ui/uikit';

import type {PageConstructorWrapperProps} from '../../common/types';
import BrandFooter from '../../components/BrandFooter/BrandFooter';
import type {PageConstructorExtension} from '../../containers/PageConstructor/PageConstructor';
import {AnimateContext} from '../../gravity-blocks/context/animateContext';
import {useContent} from '../../gravity-blocks/hooks';
import {block} from '../../utils';

const b = block('page-constructor');

interface GeneralExtensionWrapperProps {
    microdata?: {
        contentUpdatedDate?: string;
    };
}

interface GeneralExtensionGlobalConfig {
    isBranded?: boolean;
    animated?: boolean;
}

export interface GeneralPageContent extends GeneralExtensionGlobalConfig {}

export const GeneralExtensionContentWrapper: React.FC<
    GeneralExtensionWrapperProps & PageConstructorWrapperProps
> = ({children}) => {
    const {content} = useContent<GeneralPageContent>();
    const {isBranded, animated} = content;

    return (
        <div className={b('wrapper')}>
            <ThemeProvider>
                <AnimateContext.Provider value={{animated}}>
                    {children}
                    {isBranded && <BrandFooter />}
                </AnimateContext.Provider>
            </ThemeProvider>
        </div>
    );
};

export const GeneralExtension = ({
    wrapperProps = {},
    globalDefaults = {},
}: {
    wrapperProps?: GeneralExtensionWrapperProps;
    globalDefaults?: GeneralExtensionGlobalConfig;
}): PageConstructorExtension<GeneralExtensionGlobalConfig, GeneralExtensionWrapperProps> => {
    return {
        name: 'General Extension',
        id: '@gravity-ui/page-constructor/general-extension',
        settings: {
            ContentWrapper: GeneralExtensionContentWrapper,
            contentWrapperProps: wrapperProps,
            globalInputs: [
                {
                    type: 'switch',
                    title: 'Is branded',
                    name: 'isBranded',
                },
                {
                    type: 'switch',
                    title: 'Animated',
                    name: 'animated',
                },
            ],
            globalDefaults,
        },
    };
};
