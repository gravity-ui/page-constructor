import React from 'react';

import BrandFooter from '../../components/BrandFooter/BrandFooter';
import type {PageConstructorExtension} from '../../containers/PageConstructor/PageConstructor';
import type {PageConstructorWrapperProps} from '../../common/types';
import {useContent} from '../hooks';
import {block} from '../../utils';
import {MicrodataContextProps} from '../context/microdataContext';
import {GravityBlocksProvider, GravityBlocksProviderProps} from '../context/GravityBlocksProvider';

const b = block('page-constructor');

export interface GeneralExtensionGlobalConfig extends GravityBlocksProviderProps {
    isBranded?: boolean;
}

export interface GeneralExtensionWrapperProps extends GeneralExtensionGlobalConfig {
    microdata?: MicrodataContextProps;
}

export interface GeneralPageContent extends GeneralExtensionGlobalConfig {}

export const GeneralExtensionContentWrapper: React.FC<
    GeneralExtensionWrapperProps & PageConstructorWrapperProps
> = (props) => {
    const {children, isBranded: isBrandedProp, ...rest} = props;
    const {content} = useContent<GeneralPageContent>();
    const {isBranded = isBrandedProp, animated = rest.animated} = content;

    return (
        <div className={b('wrapper')}>
            <GravityBlocksProvider animated={animated} {...rest}>
                {children}
                {isBranded && <BrandFooter />}
            </GravityBlocksProvider>
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
