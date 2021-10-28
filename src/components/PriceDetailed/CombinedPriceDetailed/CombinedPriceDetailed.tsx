import _ from 'lodash';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import block from 'bem-cn-lite';

import CardBase from '../../CardBase/CardBase';
import {
    CardBorder,
    PriceDescriptionProps,
    PriceDetailsListProps,
    PriceDetailsSettingsProps,
    PriceItemProps,
} from '../../../models';
import {Grid, Row, Col, GridColumnSize} from '../../../grid';
import {BREAKPOINTS} from '../../../constants';

import './CombinedPriceDetailed.scss';

const b = block('combined-price-detailed-block');

const CombinedPricesGroupSize = {
    [GridColumnSize.Sm]: 1,
    [GridColumnSize.Md]: 2,
    [GridColumnSize.Lg]: 3,
};

interface CombinedPriceDetailedProps {
    items: PriceItemProps[];
    numberGroupItems: number;
    useMixedView?: boolean;
    getDescriptionComponent: (priceDescription: PriceDescriptionProps) => JSX.Element;
    getDetailsComponent: (
        priceDetails?: PriceDetailsSettingsProps[] | PriceDetailsListProps[],
    ) => JSX.Element;
    border?: CardBorder;
}

const CombinedPriceDetailed: React.FC<CombinedPriceDetailedProps> = (props) => {
    const {
        items,
        numberGroupItems,
        border,
        useMixedView,
        getDescriptionComponent,
        getDetailsComponent,
    } = props;

    const [groupItemsSize, setGroupItemsSize] = useState<number>(numberGroupItems);

    const updateGroupItemsSize = useCallback(
        (windowWidth: number) => {
            if (windowWidth >= BREAKPOINTS.lg) {
                setGroupItemsSize(numberGroupItems);
            } else if (BREAKPOINTS.lg > windowWidth && windowWidth >= BREAKPOINTS.md) {
                setGroupItemsSize(CombinedPricesGroupSize[GridColumnSize.Lg]);
            } else if (BREAKPOINTS.md > windowWidth && windowWidth >= BREAKPOINTS.sm) {
                setGroupItemsSize(CombinedPricesGroupSize[GridColumnSize.Md]);
            } else {
                setGroupItemsSize(CombinedPricesGroupSize[GridColumnSize.Sm]);
            }
        },
        [numberGroupItems],
    );

    useEffect(() => {
        function handleResize() {
            updateGroupItemsSize(window.innerWidth);
        }

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [updateGroupItemsSize]);

    const getPrice = (groupPrices: PriceItemProps[]) => {
        const descriptionComponents: JSX.Element[] = Array(groupItemsSize);
        const detailsComponents: JSX.Element[] = Array(groupItemsSize);

        for (let id = 0; id < groupItemsSize; id++) {
            const price = groupPrices[id];

            descriptionComponents[id] = (
                <Col key={`card_${id}`}>{price && getDescriptionComponent(price)}</Col>
            );
            detailsComponents[id] = (
                <Col key={`details_${id}`} className={price ? '' : b('empty-column')}>
                    {price && getDetailsComponent(price.items)}
                </Col>
            );
        }

        return (
            <Fragment>
                <div>{descriptionComponents}</div>
                <div className={b('description', {delimiter: useMixedView})}>
                    {detailsComponents}
                </div>
            </Fragment>
        );
    };

    const chunkedItems = _.chunk(items, groupItemsSize);

    return (
        <CardBase className={b()} border={border}>
            <CardBase.Content>
                <Grid>
                    {chunkedItems.map((chunk: PriceItemProps[], id) => {
                        return (
                            <Row key={id} className={b('row')}>
                                {getPrice(chunk)}
                            </Row>
                        );
                    })}
                </Grid>
            </CardBase.Content>
        </CardBase>
    );
};

export default CombinedPriceDetailed;
