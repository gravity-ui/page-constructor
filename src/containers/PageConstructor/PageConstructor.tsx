import React, {useMemo, useState} from 'react';

import '@diplodoc/transform/dist/js/yfm';
import {ThemeProvider} from '@gravity-ui/uikit';

import BackgroundMedia from '../../components/BackgroundMedia/BackgroundMedia';
import RootCn from '../../components/RootCn';
import {blockMap, navItemMap, subBlockMap} from '../../constructor-items';
import {AnimateContext} from '../../context/animateContext';
import {useEditorStore} from '../../context/editorContext';
import {InnerContext} from '../../context/innerContext';
import {useTheme} from '../../context/theme';
import useEditorInitialize from '../../hooks/useEditorInitialize';
import {
    BlockTypes,
    CustomConfig,
    CustomItems,
    HeaderBlockTypes,
    NavigationData,
    NavigationItemTypes,
    PageContent,
    ShouldRenderBlock,
    SubBlockTypes,
} from '../../models';
import Layout from '../../navigation/containers/Layout/Layout';
import {block as cnBlock, getCustomItems, getCustomTypes, getThemedValue} from '../../utils';

import {ConstructorBlocks} from './components';
import {ConstructorRow} from './components/ConstructorRow';

import './PageConstructor.scss';

const b = cnBlock('page-constructor');

export type ItemMap = typeof blockMap & typeof subBlockMap & CustomItems;

export type NavItemMap = typeof navItemMap & CustomItems;

export interface PageConstructorProps {
    content?: PageContent;
    shouldRenderBlock?: ShouldRenderBlock;
    custom?: CustomConfig;
    renderMenu?: () => React.ReactNode;
    navigation?: NavigationData;
}

export const Constructor = (props: PageConstructorProps) => {
    const {
        content: {blocks = [], background} = {},
        renderMenu,
        shouldRenderBlock,
        navigation,
        custom,
    } = props;

    const [content, setContent] = useState<PageContent>({blocks, background});
    const theme = useTheme();

    const {initialized} = useEditorStore();
    useEditorInitialize({content, setContent});

    const {context} = useMemo(
        () => ({
            context: {
                blockTypes: [...BlockTypes, ...getCustomTypes(['blocks', 'headers'], custom)],
                subBlockTypes: [...SubBlockTypes, ...getCustomTypes(['subBlocks'], custom)],
                headerBlockTypes: [...HeaderBlockTypes, ...getCustomTypes(['headers'], custom)],
                navigationBlockTypes: [
                    ...NavigationItemTypes,
                    ...getCustomTypes(['navigation'], custom),
                ],
                itemMap: {
                    ...blockMap,
                    ...subBlockMap,
                    ...getCustomItems(['blocks', 'headers', 'subBlocks'], custom),
                },
                navItemMap: {
                    ...navItemMap,
                    ...getCustomItems(['navigation'], custom),
                },
                loadables: custom?.loadable,
                shouldRenderBlock,
                customization: {
                    decorators: custom?.decorators,
                },
            },
        }),
        [custom, shouldRenderBlock],
    );

    const restBlocks = content.blocks;
    const themedBackground = getThemedValue(content.background, theme);

    return (
        <InnerContext.Provider value={context}>
            <RootCn className={b('', {['with-editor']: initialized})}>
                <div className={b('wrapper')}>
                    {themedBackground && (
                        <BackgroundMedia {...themedBackground} className={b('background')} />
                    )}
                    <Layout navigation={navigation}>
                        {renderMenu && renderMenu()}
                        {restBlocks && (
                            <ConstructorRow>
                                <ConstructorBlocks items={restBlocks} />
                            </ConstructorRow>
                        )}
                    </Layout>
                </div>
            </RootCn>
        </InnerContext.Provider>
    );
};

export const PageConstructor = (props: PageConstructorProps) => {
    const {content: {animated = true} = {}, ...rest} = props;

    return (
        <ThemeProvider>
            <AnimateContext.Provider value={{animated}}>
                <Constructor content={props.content} {...rest} />
            </AnimateContext.Provider>
        </ThemeProvider>
    );
};
