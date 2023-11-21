import React from 'react';

import Check from '@gravity-ui/icons/Check';

import {BackgroundImage, Button, CardBase, ContentList, Link as LinkBlock} from '../../components';
import {PriceCardProps} from '../../models';
import {block} from '../../utils';

import './PriceCard.scss';

const b = block('price-card');

const PriceCard = (props: PriceCardProps) => {
    const {
        border,
        title,
        price,
        pricePeriod,
        priceDetails,
        theme,
        description,
        list,
        buttons,
        links,
        backgroundColor,
    } = props;
    return (
        <CardBase className={b({theme})} border={border}>
            <CardBase.Content>
                <BackgroundImage className={b('background')} style={{backgroundColor}} />
                <div className={b('content', {theme})}>
                    <div className={b('info')}>
                        <div className={b('title')}>{title}</div>
                        <div className={b('price')}>
                            <div>
                                <span className={b('price-value')}>{price}</span>
                                {pricePeriod && (
                                    <span className={b('price-period')}>/ {pricePeriod}</span>
                                )}
                            </div>
                            {priceDetails && (
                                <div className={b('price-details')}>{priceDetails}</div>
                            )}
                        </div>
                        <div>{description}</div>
                        {list?.length ? (
                            <div className={b('list')}>
                                <ContentList
                                    list={list.map((item) => ({
                                        icon: Check,
                                        text: item,
                                    }))}
                                    size="l"
                                    itemClassName={b('list-item')}
                                />
                            </div>
                        ) : null}
                    </div>
                    {buttons && (
                        <div className={b('buttons')}>
                            {buttons.map((button) => (
                                <Button key={button.url} {...button} />
                            ))}
                        </div>
                    )}
                    {links && (
                        <div className={b('links')}>
                            {links.map((link) => (
                                <LinkBlock key={link.url} textSize="m" {...link} />
                            ))}
                        </div>
                    )}
                </div>
            </CardBase.Content>
        </CardBase>
    );
};

export default PriceCard;
