import React, {Fragment} from 'react';

import {CardBase} from '../../../components';
import {
    CardBorder,
    PriceDescriptionProps,
    PriceDetailsListProps,
    PriceDetailsSettingsProps,
    PriceItemProps,
} from '../../../models';
import {block} from '../../../utils';

import './SeparatePriceDetailed.scss';

const b = block('separate-price-detailed-block');

interface SeparatePriceDetailedProps {
    items: PriceItemProps[];
    getDescriptionComponent: (priceDescription: PriceDescriptionProps) => JSX.Element;
    getDetailsComponent: (
        priceDetails?: PriceDetailsSettingsProps[] | PriceDetailsListProps[],
    ) => JSX.Element;
    border?: CardBorder;
}

const SeparatePriceDetailed = (props: SeparatePriceDetailedProps) => {
    const {items, border, getDescriptionComponent, getDetailsComponent} = props;

    return (
        <Fragment>
            {items.map(({analyticsEvents, ...item}: PriceItemProps, id: number) => (
                <CardBase
                    key={id}
                    className={b()}
                    border={border}
                    analyticsEvents={analyticsEvents}
                >
                    <CardBase.Content>
                        {getDescriptionComponent(item)}
                        {getDetailsComponent(item.items)}
                    </CardBase.Content>
                </CardBase>
            ))}
        </Fragment>
    );
};

export default SeparatePriceDetailed;
