import React from 'react';

import {PageContent} from '../../../src/models';
import type {PageConstructorWrapperProps} from '../../../src/common/types';
import type {PageConstructorExtension} from '../../../src/containers/PageConstructor/PageConstructor';
import {ThemeProvider} from '@gravity-ui/uikit';
import {FileLetterP, Flag} from '@gravity-ui/icons';
import {AsideHeader} from '@gravity-ui/navigation';
import {useContent} from '../../../src';

interface ExperementalBlocksWrapperProps {}

interface ExperementalBlocksGlobalConfig {
    logo?: {
        text: string;
    };
    menuItems?: {
        id: string;
        title: string;
    }[];
}

export interface ExperementalPageContent extends PageContent, ExperementalBlocksGlobalConfig {}

export const ExperementalBlocksContentWrapper: React.FC<
    ExperementalBlocksWrapperProps & PageConstructorWrapperProps
> = ({children}) => {
    const {
        content: {logo, menuItems},
    } = useContent<ExperementalPageContent>();

    console.log('content', logo, menuItems);
    const [compact, setCompact] = React.useState(false);

    return (
        <React.Fragment>
            <div style={{width: '100%', maxHeight: '1000px'}}>
                <ThemeProvider>
                    <AsideHeader
                        logo={logo?.text ? {text: logo.text, icon: FileLetterP} : undefined}
                        menuItems={
                            menuItems
                                ? menuItems?.map((item) => ({
                                      id: item.id || '',
                                      title: item.title || '',
                                      icon: Flag,
                                  }))
                                : []
                        }
                        compact={compact}
                        onChangeCompact={setCompact}
                        renderContent={() => <div>{children}</div>}
                    />
                </ThemeProvider>
            </div>
        </React.Fragment>
    );
};

export const ExperementalBlocksExtension = ({
    wrapperProps = {},
    globalDefaults = {},
}: {
    wrapperProps?: ExperementalBlocksWrapperProps;
    globalDefaults?: ExperementalBlocksGlobalConfig;
} = {}): PageConstructorExtension<ExperementalBlocksGlobalConfig, ExperementalBlocksWrapperProps> => {
    return {
        name: 'Experemental Blocks Extension',
        id: '@Experemental-ui/page-constructor/Experemental-blocks-extension',
        settings: {
            ContentWrapper: ExperementalBlocksContentWrapper,
            contentWrapperProps: wrapperProps,
            globalInputs: [
                {
                    name: 'logo',
                    type: 'object',
                    title: 'Logo',
                    properties: [
                        {
                            name: 'text',
                            type: 'text',
                            title: 'Logo Text',
                        },
                    ],
                },
                {
                    name: 'menuItems',
                    type: 'array',
                    title: 'Menu Items',
                    arrayType: 'object',
                    buttonText: 'Add Item',

                    properties: [
                        {
                            name: 'id',
                            type: 'text',
                            title: 'Item ID',
                        },
                        {
                            name: 'title',
                            type: 'text',
                            title: 'Item Title',
                        },
                    ],
                },
            ],
            globalDefaults,
        },
    };
};
