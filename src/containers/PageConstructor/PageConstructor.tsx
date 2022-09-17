import React, {useMemo} from 'react';
import _ from 'lodash';

import {
    Block,
    ShouldRenderBlock,
    HeaderBlockTypes,
    CustomConfig,
    PageContent,
    CustomItems,
    BlockTypes,
} from '../../models';
import {blockMap, subBlockMap} from '../../constructor-items';
import {Grid} from '../../grid';
import BackgroundMedia from '../../components/BackgroundMedia/BackgroundMedia';
import {
    block as cnBlock,
    getCustomBlockTypes,
    getCustomHeaderTypes,
    getThemedValue,
    getCustomItems,
} from '../../utils';
import {withThemeValue, WithThemeValueProps} from '../../context/theme/withThemeValue';
import {AnimateContext} from '../../context/animateContext';
import {InnerContext} from '../../context/innerContext';
import {ConstructorRow} from './components/ConstructorRow';
import {ConstructorFootnotes} from './components/ConstructorFootnotes';
import {ConstructorHeader} from './components/ConstructorItem';
import {ConstructorBlocks} from './components/ConstructorBlocks';

import './PageConstructor.scss';

const b = cnBlock('page-constructor');

export type ItemMap = typeof blockMap & typeof subBlockMap & CustomItems;
export interface PageConstructorProps {
    content?: PageContent;
    shouldRenderBlock?: ShouldRenderBlock;
    custom?: CustomConfig;
    renderMenu?: () => React.ReactNode;
}

type Props = PageConstructorProps & WithThemeValueProps;

export const Constructor = (props: Props) => {
    const {context, headerBlockTypes} = useMemo(
        () => ({
            context: {
                blockTypes: [...BlockTypes, ...getCustomBlockTypes(props.custom)],
                itemMap: {
                    ...blockMap,
                    ...subBlockMap,
                    ...getCustomItems(props.custom),
                },
                loadables: props?.custom?.loadable,
            },
            headerBlockTypes: [...HeaderBlockTypes, ...getCustomHeaderTypes(props.custom)],
        }),
        [props.custom],
    );

    const {
        content: {blocks = [], background = {}, footnotes = []} = {},
        renderMenu,
        themeValue: theme,
        shouldRenderBlock,
    } = props;

    const hasFootnotes = footnotes.length > 0;
    const isHeaderBlock = (block: Block) => headerBlockTypes.includes(block.type);
    const header = blocks?.find(isHeaderBlock);
    const restBlocks = blocks?.filter((block) => !isHeaderBlock(block));
    const themedBackground = getThemedValue(background, theme);

    return (
        <InnerContext.Provider value={context}>
            <div className={b()}>
                <div className={b('wrapper')}>
                    <BackgroundMedia {...themedBackground} className={b('background')} />
                    {renderMenu && renderMenu()}
                    {header && <ConstructorHeader data={header} />}
                    <Grid>
                        {restBlocks && (
                            <ConstructorRow>
                                <ConstructorBlocks
                                    items={restBlocks}
                                    shouldRenderBlock={shouldRenderBlock}
                                />
                            </ConstructorRow>
                        )}
                        {hasFootnotes && (
                            <ConstructorRow>
                                <ConstructorFootnotes items={footnotes} />
                            </ConstructorRow>
                        )}
                    </Grid>
                </div>
            </div>
        </InnerContext.Provider>
    );
};

const ThemedConstructor = withThemeValue(Constructor);

export const PageConstructor = (props: PageConstructorProps) => {
    const {content: {animated = true} = {}, ...rest} = props;

    return (
        <AnimateContext.Provider value={{animated}}>
            <ThemedConstructor content={props.content} {...rest} />
        </AnimateContext.Provider>
    );
};
