import React, {ReactElement, ReactNode} from 'react';
import _ from 'lodash';

import {
    Block,
    BlockV2,
    ShouldRenderBlock,
    BlockV2Types,
    HeaderBlockTypes,
    CustomConfig,
    BlockType,
    LoadableConfigItem,
    PageContent,
    CustomBlocks,
} from '../../models';
import componentMap from '../../componentMap';
import Loadable from '../Loadable/Loadable';
import {Col, Grid, Row} from '../../grid';
import BlockBase from '../../components/BlockBase/BlockBase';
import BackgroundMedia from '../../components/BackgroundMedia/BackgroundMedia';
import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import {
    getBlockKey,
    getCustomBlockV2Types,
    getCustomComponents,
    getCustomHeaderTypes,
    block,
} from '../../utils';

import './PageConstructor.scss';
import '../../../styles/yfm.scss';

const b = block('page-constructor');

export interface PageConstructorProps {
    content?: PageContent;
    shouldRenderBlock?: ShouldRenderBlock;
    custom?: CustomConfig;
    renderMenu?: () => React.ReactNode;
}

export type FullComponentsMap = typeof componentMap & CustomBlocks;

export class PageConstructor extends React.Component<PageConstructorProps> {
    fullComponentsMap: FullComponentsMap = {
        ...componentMap,
        ...getCustomComponents(this.props.custom),
    };
    fullBlockV2Types = [...BlockV2Types, ...getCustomBlockV2Types(this.props.custom)];
    fullHeaderBlockTypes = [...HeaderBlockTypes, ...getCustomHeaderTypes(this.props.custom)];

    render() {
        const {content: {blocks = [], background = {}, footnotes = []} = {}, renderMenu} =
            this.props;

        const hasFootnotes = footnotes.length > 0;
        const header = blocks?.find(this.isHeaderBlock);
        const restBlocks = blocks?.filter((block: Block) => !this.isHeaderBlock(block));

        return (
            <div className={b({'has-footnotes': hasFootnotes})}>
                <div className={b('wrapper')}>
                    <BackgroundMedia {...background} className={b('background')} />
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

    private renderHeader = (header: Block) =>
        this.renderBlock(
            header,
            header.type,
            header.type === BlockType.Header && header.children
                ? this.renderBlocks(header.children)
                : undefined,
        );

    private renderRow(content: ReactNode) {
        return (
            content && (
                <Row className={b('row')}>
                    <Col className={b('col')}>{content}</Col>
                </Row>
            )
        );
    }

    private renderBlocks(blocks: Block[]) {
        const renderer = (block: Block, index: number): ReactElement | null => {
            let children;
            let blockElement;
            const blockKey = getBlockKey(block, index);

            if ('loadable' in block && block.loadable) {
                const {source} = block.loadable;
                const config: LoadableConfigItem = _.get(this.props, `custom.loadable[${source}]`);

                if (!config) {
                    return null;
                }

                blockElement = this.renderLoadable(block, blockKey, config);
            } else {
                if ('children' in block && block.children) {
                    children = block.children.map(renderer);
                }

                blockElement = this.renderBlock(block, blockKey, children);
            }

            return this.isV2Block(block)
                ? this.renderV2Block(block, blockKey, blockElement)
                : blockElement;
        };

        return blocks.map(renderer);
    }

    private renderBlock = (block: Block, blockKey: string, children?: (ReactElement | null)[]) => {
        const {type, ...rest} = block;
        const components = this.fullComponentsMap;
        const Component = components[type] as React.ComponentType<
            React.ComponentProps<typeof components[typeof type]>
        >;

        return (
            <Component key={blockKey} {...rest}>
                {children}
            </Component>
        );
    };

    private renderV2Block(block: BlockV2, blockKey: string, Component: ReactElement) {
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

    private renderLoadable(block: Block, blockKey: string, config: LoadableConfigItem) {
        const {type} = block;
        const {fetch, component: ChildComponent} = config;
        const components = this.fullComponentsMap;
        const Component = components[type] as React.ComponentType<
            React.ComponentProps<typeof components[typeof type]>
        >;

        return (
            <Loadable
                key={blockKey}
                block={block}
                blockKey={blockKey}
                Component={Component}
                ChildComponent={ChildComponent}
                fetch={fetch}
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

    private isV2Block(block: Block): block is BlockV2 {
        return this.fullBlockV2Types.includes(block.type);
    }
}
