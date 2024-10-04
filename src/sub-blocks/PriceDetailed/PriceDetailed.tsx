import React, {Fragment} from 'react';

import {
    PriceDescriptionProps,
    PriceDetailedProps,
    PriceDetailsListProps,
    PriceDetailsSettingsProps,
    PriceDetailsType,
} from '../../models';

import CombinedPriceDetailed from './CombinedPriceDetailed/CombinedPriceDetailed';
import PriceDescription from './PriceDescription/PriceDescription';
import PriceDetails from './PriceDetails/PriceDetails';
import SeparatePriceDetailed from './SeparatePriceDetailed/SeparatePriceDetailed';

// eslint-disable-next-line valid-jsdoc
/** @deprecated */
const PriceDetailed = (props: PriceDetailedProps) => {
    const {
        priceType = PriceDetailsType.SETTINGS,
        items = [],
        numberGroupItems = 1,
        description,
        details,
        foldable,
        labelsDefaultText,
        isCombined = false,
        useMixedView = false,
        border,
    } = props;

    const {
        titleSize: descriptionTitleSize = 'l',
        descriptionSize = 'm',
        titleColor: descriptionTitleColor = 'cornflower',
    } = description || {};

    const {titleSize: detailsTitleSize = 's', descriptionSize: detailsDescriptionSize = 'm'} =
        details || {};

    const getDescriptionComponent = (priceDescription: PriceDescriptionProps) => {
        return (
            <PriceDescription
                {...priceDescription}
                titleSize={descriptionTitleSize}
                descriptionSize={descriptionSize}
                colorTitle={descriptionTitleColor}
                labelsDefaultText={labelsDefaultText}
            />
        );
    };

    const getDetailsComponent = (
        priceDetails?: PriceDetailsSettingsProps[] | PriceDetailsListProps[],
    ) => {
        return (
            <PriceDetails
                items={priceDetails}
                type={priceType}
                foldable={foldable}
                titleSize={detailsTitleSize}
                descriptionSize={detailsDescriptionSize}
                useMixedView={useMixedView}
            />
        );
    };

    return (
        <Fragment>
            {isCombined ? (
                <CombinedPriceDetailed
                    items={items}
                    numberGroupItems={numberGroupItems}
                    border={border}
                    useMixedView={useMixedView}
                    getDescriptionComponent={getDescriptionComponent}
                    getDetailsComponent={getDetailsComponent}
                />
            ) : (
                <SeparatePriceDetailed
                    items={items}
                    border={border}
                    getDescriptionComponent={getDescriptionComponent}
                    getDetailsComponent={getDetailsComponent}
                />
            )}
        </Fragment>
    );
};

export default PriceDetailed;
