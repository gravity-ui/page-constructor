import React, {ReactElement, ReactNode} from 'react';
import _ from 'lodash';

import {
    Block,
    ShouldRenderBlock,
    HeaderBlockTypes,
    CustomConfig,
    LoadableConfigItem,
    PageContent,
    CustomComponents,
    BlockTypes,
    ConstructorItem,
} from '../../models';
import {blockMap, subBlockMap} from '../../constructor-items';
import Loadable from '../Loadable/Loadable';
import {Col, Grid, Row} from '../../grid';
import BlockBase from '../../components/BlockBase/BlockBase';
import BackgroundMedia from '../../components/BackgroundMedia/BackgroundMedia';
import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import {
    getItemKey,
    getCustomBlockTypes,
    getCustomHeaderTypes,
    getCustomComponents,
    block as cnBlock,
    getThemedValue,
} from '../../utils';
import {withThemeValue, WithThemeValueProps} from '../../context/theme/withThemeValue';
import {AnimateContext} from '../../context/animateContext';

import './PageConstructor.scss';
import '../../../styles/yfm.scss';

const b = cnBlock('page-constructor');

export interface PageConstructorProps {
    content?: PageContent;
    shouldRenderBlock?: ShouldRenderBlock;
    custom?: CustomConfig;
    renderMenu?: () => React.ReactNode;
}

type Props = PageConstructorProps & WithThemeValueProps;

export type ItemMap = typeof blockMap & typeof subBlockMap & CustomComponents;

type RenderLoadableParams = {
    block: Block;
    blockKey: string;
    config: LoadableConfigItem;
    serviceId?: number;
};

class Constructor extends React.Component<Props> {
    blockTypes = [...BlockTypes, ...getCustomBlockTypes(this.props.custom)];
    itemMap: ItemMap = {
        ...blockMap,
        ...subBlockMap,
        ...getCustomComponents(this.props.custom),
    };
    fullHeaderBlockTypes = [...HeaderBlockTypes, ...getCustomHeaderTypes(this.props.custom)];

    render() {
        const {
            content: {blocks = [], background = {}, footnotes = []} = {},
            renderMenu,
            themeValue: theme,
        } = this.props;

        const hasFootnotes = footnotes.length > 0;
        const header = blocks?.find(this.isHeaderBlock);
        const restBlocks = blocks?.filter((block: Block) => !this.isHeaderBlock(block));
        const themedBackground = getThemedValue(background, theme);

        return (
            <div className={b({'has-footnotes': hasFootnotes})}>
                <div className={b('wrapper')}>
                    <BackgroundMedia {...themedBackground} className={b('background')} />
                    {renderMenu && renderMenu()}
                    {header && this.renderHeader(header)}
                    <Grid className={b('grid')}>
                        {restBlocks && this.renderRow(this.renderBlocks(restBlocks))}
                        {hasFootnotes && this.renderRow(this.renderFootnotes(footnotes))}
                    </Grid>
                </div>
            </div>
        );
    }

    private renderHeader = (header: Block) => this.renderItem(header, header.type);

    private renderRow(content: ReactNode) {
        return (
            content && (
                <Row className={b('row')}>
                    <Col className={b('col')}>{content}</Col>
                </Row>
            )
        );
    }

    private isItemExist(item: ConstructorItem) {
        return Boolean(this.itemMap[item.type]);
    }

    private renderBlocks(blocks: ConstructorItem[]) {
        const renderer = (item: ConstructorItem, index: number): ReactElement | null => {
            if (!this.isItemExist(item)) {
                return null;
            }

            let children;
            let itemElement;
            const itemKey = getItemKey(item, index);

            if ('loadable' in item && item.loadable) {
                const {source, serviceId} = item.loadable;
                const config: LoadableConfigItem = _.get(this.props, `custom.loadable[${source}]`);
                if (!config) {
                    return null;
                }

                itemElement = this.renderLoadable({
                    block: item,
                    blockKey: itemKey,
                    config,
                    serviceId,
                });
            } else {
                if ('children' in item && item.children) {
                    children = item.children.map(renderer);
                }

                itemElement = this.renderItem(item, itemKey, children);
            }

            return this.isBlock(item) ? this.renderBlock(item, itemKey, itemElement) : itemElement;
        };

        return blocks.map(renderer);
    }

    private renderItem = (
        item: ConstructorItem,
        itemKey: string,
        children?: (ReactElement | null)[],
    ) => {
        const {type, ...rest} = item;
        const components = this.itemMap;

        const Component = components[type] as React.ComponentType<
            React.ComponentProps<typeof components[typeof type]>
        >;

        return (
            <Component key={itemKey} {...rest}>
                {children}
            </Component>
        );
    };

    private renderBlock(block: Block, blockKey: string, Component: ReactElement) {
        const {shouldRenderBlock} = this.props;
        const {anchor, visible} = block;

        if (shouldRenderBlock && !shouldRenderBlock(block, blockKey)) {
            return null;
        }

        return (
            <BlockBase
                className={b('block', {type: block.type})}
                key={blockKey}
                anchor={anchor}
                visible={visible}
                resetPaddings={block.resetPaddings}
            >
                {Component}
            </BlockBase>
        );
    }

    private renderLoadable(params: RenderLoadableParams) {
        const {block, blockKey, config, serviceId} = params;
        const {type} = block;
        const {fetch, component: ChildComponent} = config;
        const blocks = this.itemMap;
        const Component = blocks[type] as React.ComponentType<
            React.ComponentProps<typeof blocks[typeof type]>
        >;

        return (
            <Loadable
                key={blockKey}
                block={block}
                blockKey={blockKey}
                Component={Component}
                ChildComponent={ChildComponent}
                fetch={fetch}
                serviceId={serviceId}
            />
        );
    }

    private renderFootnotes(footnotes: string[]) {
        return (
            <ol className={b('footnotes')}>
                {footnotes.map((footnote, index) => (
                    <li className={b('footnotes-item')} key={index}>
                        <YFMWrapper
                            content={footnote}
                            modifiers={{
                                constructor: true,
                                constructorFootnotePage: true,
                            }}
                        />
                    </li>
                ))}
            </ol>
        );
    }

    private isHeaderBlock = (block: Block) => {
        return this.fullHeaderBlockTypes.includes(block.type);
    };

    private isBlock(item: ConstructorItem): item is Block {
        return this.blockTypes.includes(item.type);
    }
}

const ThemedConstructor = withThemeValue(Constructor);

export const PageConstructor: React.FC<PageConstructorProps> = (props) => {
    const {content: {animated = true} = {}, ...rest} = props;

    return (
        <AnimateContext.Provider value={{animated}}>
            <ThemedConstructor content={props.content} {...rest} />
        </AnimateContext.Provider>
    );
};
