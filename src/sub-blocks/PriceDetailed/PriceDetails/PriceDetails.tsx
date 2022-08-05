import React, {Fragment, useCallback, useState} from 'react';

import {block} from '../../../utils';
import {Foldable, ToggleArrow} from '../../../components';
import {
    PriceDetailsSettingsProps,
    PriceDetailsListProps,
    PriceDetailsType,
    TextSize,
    PriceDetailsProps,
    PriceFoldableDetailsProps,
} from '../../../models';
import List from './Details/List';
import Settings from './Details/Settings';

import './PriceDetails.scss';

const b = block('price-details');

interface PriceDetailsExtendProps extends PriceDetailsProps {
    type: PriceDetailsType;
    titleSize?: TextSize;
    descriptionSize?: TextSize;
    foldable?: PriceFoldableDetailsProps;
    useMixedView?: boolean;
    className?: string;
}

const PriceDetails: React.FunctionComponent<PriceDetailsExtendProps> = (props) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const toggleOpen = useCallback(() => {
        setIsOpened(!isOpened);
    }, [isOpened]);

    const {
        items = [],
        type = PriceDetailsType.SETTINGS,
        titleSize = 's',
        descriptionSize = 'm',
        foldable,
        useMixedView,
        className,
    } = props;

    const {
        title: foldableTitle,
        size: foldableSize = descriptionSize,
        titleColor: foldableColor = 'cornflower',
    } = foldable || {};

    const getPriceDetails = () => {
        switch (type) {
            case PriceDetailsType.MARKED_LIST:
                return <List items={items as PriceDetailsListProps[]} titleSize={titleSize} />;
            case PriceDetailsType.SETTINGS:
            default:
                return (
                    <Settings
                        items={items as PriceDetailsSettingsProps[]}
                        titleSize={titleSize}
                        descriptionSize={descriptionSize}
                    />
                );
        }
    };

    const getFoldableBlock = () => {
        return <div className={b('foldable_block')}>{getPriceDetails()}</div>;
    };

    const getFoldableTitle = () => {
        return (
            <div
                className={b('foldable_title', {color: foldableColor, size: foldableSize})}
                onClick={toggleOpen}
            >
                {foldableTitle}

                <ToggleArrow open={isOpened} size={14} type={'vertical'} className={b('arrow')} />
            </div>
        );
    };

    const getFoldableComponent = (customClassName = '') => {
        return (
            <div className={customClassName}>
                {getFoldableTitle()}
                <Foldable isOpened={isOpened}>{getFoldableBlock()}</Foldable>
            </div>
        );
    };

    const getNonFoldableComponent = (customClassName = '') => {
        return <div className={customClassName}>{getFoldableBlock()}</div>;
    };

    const getComponentMixedView = () => {
        if (foldable) {
            return (
                <Fragment>
                    {getFoldableComponent(b('foldable'))}
                    {getNonFoldableComponent(b('non_foldable'))}
                </Fragment>
            );
        }

        return getNonFoldableComponent(b('delimiter-line'));
    };

    const getComponentSimpleView = () => {
        return foldable ? getFoldableComponent() : getNonFoldableComponent(b('delimiter-line'));
    };

    return (
        <div className={b(null, className)}>
            {useMixedView ? getComponentMixedView() : getComponentSimpleView()}
        </div>
    );
};

export default PriceDetails;
