import React, {useCallback, useContext, useEffect, useMemo} from 'react';

import {block} from '../../../utils';
import {
    PriceDescriptionColor,
    PriceDescriptionProps,
    PriceLabelColor,
    TextSize,
    ReactFCC,
} from '../../../models';
import {StylesContext} from '../../../context/stylesContext';
import {YFMWrapper} from '../../../components';

import './PriceDescription.scss';

const b = block('price-description');

interface PriceDescriptionExtendProps extends PriceDescriptionProps {
    titleSize?: TextSize;
    descriptionSize?: TextSize;
    colorTitle?: PriceDescriptionColor;
    labelsDefaultText?: Record<PriceLabelColor, string>;
    className?: string;
}

const PriceDescription: ReactFCC<PriceDescriptionExtendProps> = (props) => {
    const {
        title,
        detailedTitle = '',
        description,
        titleSize = 'l',
        descriptionSize = 'm',
        colorTitle = 'cornflower',
        label,
        labelsDefaultText,
        className,
    } = props;

    const descriptionRef = React.useRef<HTMLDivElement>(null);
    const {pricesDetailedDescriptionHeight, setStyles} = useContext(StylesContext);

    const setDescriptionHeight = useCallback(() => {
        if (!descriptionRef || !descriptionRef.current) {
            return;
        }

        const descriptionChildren = descriptionRef.current?.children;

        if (!descriptionChildren) {
            return;
        }

        const childrenHeight = [...descriptionChildren].reduce(
            (result: number, element: Element) => result + element.clientHeight,
            0,
        );

        if (
            pricesDetailedDescriptionHeight === undefined ||
            Number(pricesDetailedDescriptionHeight) < childrenHeight
        ) {
            setStyles({pricesDetailedDescriptionHeight: childrenHeight.toString()});
        } else if (childrenHeight < Number(pricesDetailedDescriptionHeight)) {
            descriptionRef.current.style.height = `${pricesDetailedDescriptionHeight}px`;
        }
    }, [pricesDetailedDescriptionHeight, setStyles]);

    useEffect(() => {
        setDescriptionHeight();

        window.addEventListener('resize', setDescriptionHeight);
        return () => window.removeEventListener('resize', setDescriptionHeight);
    }, [setDescriptionHeight]);

    const labelElement = useMemo(() => {
        if (!label) {
            return null;
        }

        const labelTitle = label.text || (labelsDefaultText && labelsDefaultText[label.color]);

        return (
            <div className={b('label', {color: label.color, size: label.size || descriptionSize})}>
                {labelTitle}
            </div>
        );
    }, [descriptionSize, label, labelsDefaultText]);

    const titleElement = useMemo(() => {
        return (
            <div className={b('title', {size: titleSize})}>
                <div className={b('main-title', {color: colorTitle})}>{title}</div>
                <div className={b('detailed-title', {size: descriptionSize})}>{detailedTitle}</div>
            </div>
        );
    }, [colorTitle, descriptionSize, detailedTitle, title, titleSize]);

    return (
        <div className={b(null, className)} ref={descriptionRef}>
            {labelElement}
            {titleElement}
            <div className={b('description', {size: descriptionSize})}>
                <YFMWrapper content={description} modifiers={{constructor: true}} />
            </div>
        </div>
    );
};

export default PriceDescription;
