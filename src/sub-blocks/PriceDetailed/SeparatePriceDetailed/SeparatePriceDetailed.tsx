import React, {Fragment} from 'react';

import {block} from '../../../utils';
import {CardBase} from '../../../components';
import {
    CardBorder,
    PriceDescriptionProps,
    PriceDetailsListProps,
    PriceDetailsSettingsProps,
    PriceItemProps,
} from '../../../models';

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

const SeparatePriceDetailed: React.FC<SeparatePriceDetailedProps> = (props) => {
    const {items, border, getDescriptionComponent, getDetailsComponent} = props;

    return (
        <Fragment>
            {items.map((item: PriceItemProps, id: number) => (
                <CardBase key={id} className={b()} border={border}>
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
