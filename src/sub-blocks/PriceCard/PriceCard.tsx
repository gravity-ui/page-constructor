import React from 'react';

import Check from '@gravity-ui/icons/Check';

import {Button, CardBase, ContentList, Link as LinkBlock} from '../../components';
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
        button,
        link,
        backgroundColor,
    } = props;
    return (
        <CardBase className={b({theme})} border={border}>
            <CardBase.Content>
                <div className={b('bg')} style={{backgroundColor}} />
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
                                    list={list.map((text) => ({
                                        icon: Check,
                                        text,
                                    }))}
                                    size="s"
                                />
                            </div>
                        ) : null}
                    </div>
                    {button && <Button className={b('button')} {...button} />}
                    {link && <LinkBlock className={b('link')} textSize="m" {...link} />}
                </div>
            </CardBase.Content>
        </CardBase>
    );
};

export default PriceCard;