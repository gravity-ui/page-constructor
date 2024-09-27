import React from 'react';

import {AnimateBlock, Title, YFMWrapper} from '../../components/';
import Image from '../../components/Image/Image';
import {getMediaImage} from '../../components/Media/Image/utils';
import {useTheme} from '../../context/theme';
import {Col, Row} from '../../grid';
import {ExtendedFeaturesProps} from '../../models';
import {Content} from '../../sub-blocks';
import {block, getThemedValue} from '../../utils';

import './ExtendedFeatures.scss';

const b = block('ExtendedFeaturesBlock');

const DEFAULT_SIZES = {
    all: 12,
    sm: 6,
    md: 4,
};

export const ExtendedFeaturesBlock = ({
    title,
    description,
    items,
    colSizes = DEFAULT_SIZES,
    animated,
}: ExtendedFeaturesProps) => {
    const theme = useTheme();
    const itemTitleHeadingTag = title ? 'h3' : 'h2';

    return (
        <AnimateBlock className={b()} animate={animated}>
            <Title title={title} subtitle={description} className={b('header')} />
            <div className={b('items')}>
                <Row>
                    {items.map(
                        ({
                            title: itemTitle,
                            text,
                            list,
                            link,
                            links,
                            label,
                            icon,
                            buttons,
                            additionalInfo,
                        }) => {
                            const itemLinks = links || [];

                            const iconThemed = icon && getThemedValue(icon, theme);
                            const iconData = iconThemed && getMediaImage(iconThemed);

                            if (link) {
                                itemLinks.push(link);
                            }

                            return (
                                <Col className={b('item')} key={text || itemTitle} sizes={colSizes}>
                                    {iconData && (
                                        <div className={b('icon-wrap')} aria-hidden>
                                            <Image {...iconData} className={b('icon')} />
                                        </div>
                                    )}
                                    <div className={b('container')}>
                                        {itemTitle && (
                                            <YFMWrapper
                                                variant={itemTitleHeadingTag}
                                                content={itemTitle}
                                                className={b('item-title-container')}
                                                contentClassName={b('item-title')}
                                                modifiers={{
                                                    constructor: true,
                                                }}
                                            >
                                                {label && (
                                                    <span className={b('item-label')}>{label}</span>
                                                )}
                                            </YFMWrapper>
                                        )}
                                        <Content
                                            text={text}
                                            links={itemLinks}
                                            size="s"
                                            list={list}
                                            colSizes={{all: 12, md: 12}}
                                            buttons={buttons}
                                            additionalInfo={additionalInfo}
                                        />
                                    </div>
                                </Col>
                            );
                        },
                    )}
                </Row>
            </div>
        </AnimateBlock>
    );
};

export default ExtendedFeaturesBlock;
