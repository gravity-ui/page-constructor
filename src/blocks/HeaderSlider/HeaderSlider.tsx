import React from 'react';
import {block} from '../../utils';

import {SliderType, HeaderSliderBlockProps} from '../../models';
import {SliderBlock} from '../index';
import Header from '../Header/Header';

import './HeaderSlider.scss';

const b = block('header-slider-block');

export const HeaderSliderBlock: React.FunctionComponent<HeaderSliderBlockProps> = ({
    items,
    ...props
}) => (
    <div className={b('wrapper')} data-qa="header-slider">
        <SliderBlock
            {...props}
            slidesToShow={1}
            type={SliderType.HeaderCard}
            animated={false}
            blockClassName={b()}
        >
            {items.map((item, index) => (
                <div key={index} className={b('item')} data-qa={`header-slider-item-${index + 1}`}>
                    <Header {...item} className={b('item-content')} />
                </div>
            ))}
        </SliderBlock>
    </div>
);

export default HeaderSliderBlock;
