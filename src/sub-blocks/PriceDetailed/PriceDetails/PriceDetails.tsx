import * as React from 'react';

import {Foldable, ToggleArrow} from '../../../components';
import {
    PriceDetailsListProps,
    PriceDetailsProps,
    PriceDetailsSettingsProps,
    PriceDetailsType,
    PriceFoldableDetailsProps,
    TextSize,
} from '../../../models';
import {block} from '../../../utils';

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

const PriceDetails = (props: PriceDetailsExtendProps) => {
    const [isOpened, setIsOpened] = React.useState<boolean>(false);
    const toggleOpen = React.useCallback(() => {
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
            <button
                className={b('foldable_title', {color: foldableColor, size: foldableSize})}
                onClick={toggleOpen}
                aria-expanded={isOpened}
            >
                {foldableTitle}
                <ToggleArrow open={isOpened} size={14} type={'vertical'} className={b('arrow')} />
            </button>
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
                <React.Fragment>
                    {getFoldableComponent(b('foldable'))}
                    {getNonFoldableComponent(b('non_foldable'))}
                </React.Fragment>
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
