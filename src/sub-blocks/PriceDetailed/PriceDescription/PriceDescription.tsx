import React, {useCallback, useContext, useEffect, useMemo} from 'react';

import {Label, LabelProps} from '@gravity-ui/uikit';

import {YFMWrapper} from '../../../components';
import {StylesContext} from '../../../context/stylesContext';
import {
    PriceDescriptionColor,
    PriceDescriptionProps,
    PriceLabelColor,
    TextSize,
} from '../../../models';
import {block} from '../../../utils';

import './PriceDescription.scss';

const b = block('price-description');

interface PriceDescriptionExtendProps extends PriceDescriptionProps {
    titleSize?: TextSize;
    descriptionSize?: TextSize;
    colorTitle?: PriceDescriptionColor;
    labelsDefaultText?: Record<PriceLabelColor, string>;
    className?: string;
}

const LabelColorsMapping = {
    [PriceLabelColor.BLUE]: 'info',
    [PriceLabelColor.GREEN]: 'success',
    [PriceLabelColor.YELLOW]: 'warning',
    [PriceLabelColor.PURPLE]: 'normal',
    [PriceLabelColor.RED]: 'dnager',
};

const LabelSizeMap: Record<TextSize, LabelProps['size']> = {
    l: 's',
    m: 's',
    s: 'xs',
    xs: 'xs',
};

const PriceDescription = (props: PriceDescriptionExtendProps) => {
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

        window.addEventListener('resize', setDescriptionHeight, {passive: true});
        return () => window.removeEventListener('resize', setDescriptionHeight);
    }, [setDescriptionHeight]);

    const labelElement = useMemo(() => {
        if (!label) {
            return null;
        }

        const labelTitle = label.text || (labelsDefaultText && labelsDefaultText[label.color]);
        const labelColor = (LabelColorsMapping[label.color] || 'unknown') as LabelProps['theme'];
        const labelSize = LabelSizeMap[label.size || descriptionSize];

        return (
            <Label className={b('label', {size: labelSize})} theme={labelColor} size={labelSize}>
                {labelTitle}
            </Label>
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
