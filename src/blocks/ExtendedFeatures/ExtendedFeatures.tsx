import React, {useContext} from 'react';

import {AnimateBlock, HTML, Title} from '../../components/';
import Image from '../../components/Image/Image';
import {getMediaImage} from '../../components/Media/Image/utils';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
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
    const {themeValue: theme} = useContext(ThemeValueContext);

    return (
        <AnimateBlock className={b()} animate={animated}>
            <Title title={title} subtitle={description} className={b('header')} />
            <div className={b('items')}>
                <Row>
                    {items.map(
                        ({
                            title: itemTitle,
                            text,
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
                                    {iconData && <Image {...iconData} className={b('icon')} />}
                                    <div className={b('container')}>
                                        {itemTitle && (
                                            <h5 className={b('item-title')}>
                                                <HTML>{itemTitle}</HTML>
                                                {label && (
                                                    <span className={b('item-label')}>{label}</span>
                                                )}
                                            </h5>
                                        )}
                                        <Content
                                            text={text}
                                            links={itemLinks}
                                            size="s"
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
