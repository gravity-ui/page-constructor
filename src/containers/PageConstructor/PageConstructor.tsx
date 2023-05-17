import React, {useContext, useMemo} from 'react';

import '@doc-tools/transform/dist/js/yfm';

import {ConstructorEditorProps} from '../../../src/editor/Containers/Editor';
import BackgroundMedia from '../../components/BackgroundMedia/BackgroundMedia';
import {blockMap, subBlockMap} from '../../constructor-items';
import {AnimateContext} from '../../context/animateContext';
import {InnerContext} from '../../context/innerContext';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
import {Grid} from '../../grid';
import {
    BlockType,
    BlockTypes,
    CustomConfig,
    CustomItems,
    HeaderBlockTypes,
    NavigationData,
    PageContent,
    ShouldRenderBlock,
    SubBlockTypes,
} from '../../models';
import Layout from '../../navigation/containers/Layout/Layout';
import {
    block as cnBlock,
    getCustomBlockTypes,
    getCustomHeaderTypes,
    getCustomItems,
    getCustomSubBlockTypes,
    getHeaderBlock,
    getOrderedBlocks,
    getThemedValue,
} from '../../utils';

import {ConstructorBlocks} from './components/ConstructorBlocks';
import {ConstructorFootnotes} from './components/ConstructorFootnotes';
import {ConstructorHeader} from './components/ConstructorItem';
import {ConstructorRow} from './components/ConstructorRow';

import './PageConstructor.scss';

const b = cnBlock('page-constructor');

export type ItemMap = typeof blockMap & typeof subBlockMap & CustomItems;

export interface PageConstructorProps {
    content?: PageContent;
    shouldRenderBlock?: ShouldRenderBlock;
    custom?: CustomConfig;
    renderMenu?: () => React.ReactNode;
    navigation?: NavigationData;
    editor?: ConstructorEditorProps;
}

export const Constructor = (props: PageConstructorProps) => {
    const {
        content: {blocks = [], background = {}, footnotes = []} = {},
        renderMenu,
        shouldRenderBlock,
        navigation,
        custom,
        editor,
    } = props;

    const {context} = useMemo(
        () => ({
            context: {
                blockTypes: [...BlockTypes, ...getCustomBlockTypes(custom)],
                subBlockTypes: [...SubBlockTypes, ...getCustomSubBlockTypes(custom)],
                headerBlockTypes: [...HeaderBlockTypes, ...getCustomHeaderTypes(custom)],
                itemMap: {
                    ...blockMap,
                    ...subBlockMap,
                    ...getCustomItems(custom),
                },
                loadables: custom?.loadable,
                shouldRenderBlock,
                editor,
            },
        }),
        [custom, shouldRenderBlock, editor],
    );

    const {themeValue: theme} = useContext(ThemeValueContext);

    const hasFootnotes = footnotes.length > 0;
    const header = getHeaderBlock(blocks, context.headerBlockTypes);
    const restBlocks = getOrderedBlocks(blocks, context.headerBlockTypes);
    const themedBackground = getThemedValue(background, theme);

    return (
        <InnerContext.Provider value={context}>
            <div className={b()}>
                <div className={b('wrapper')}>
                    {themedBackground && (
                        <BackgroundMedia {...themedBackground} className={b('background')} />
                    )}
                    <Layout navigation={navigation}>
                        {renderMenu && renderMenu()}
                        {header && (
                            <ConstructorHeader data={header} blockKey={BlockType.HeaderBlock} />
                        )}
                        <Grid>
                            {restBlocks && (
                                <ConstructorRow>
                                    <ConstructorBlocks items={restBlocks} />
                                </ConstructorRow>
                            )}
                            {hasFootnotes && (
                                <ConstructorRow>
                                    <ConstructorFootnotes items={footnotes} />
                                </ConstructorRow>
                            )}
                        </Grid>
                    </Layout>
                </div>
            </div>
        </InnerContext.Provider>
    );
};

export const PageConstructor = (props: PageConstructorProps) => {
    const {content: {animated = true} = {}, ...rest} = props;

    return (
        <AnimateContext.Provider value={{animated}}>
            <Constructor content={props.content} {...rest} />
        </AnimateContext.Provider>
    );
};
