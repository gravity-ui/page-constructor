import * as React from 'react';

import {SliderBlock} from '../../blocks';
import {MobileContext} from '../../context/mobileContext';
import {HeaderSliderBlockProps, SliderType} from '../../models';
import {block} from '../../utils';
import Header from '../Header/Header';

import './HeaderSlider.scss';

const b = block('header-slider-block');

export const HeaderSliderBlock = ({items, arrows, ...props}: HeaderSliderBlockProps) => {
    const isMobile = React.useContext(MobileContext);
    const showArrows = isMobile ? false : arrows;

    return (
        <div className={b('wrapper')} data-qa="header-slider">
            <SliderBlock
                {...props}
                arrows={showArrows}
                slidesToShow={1}
                type={SliderType.HeaderCard}
                animated={false}
                blockClassName={b()}
                arrowSize={20}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={b('item')}
                        data-qa={`header-slider-item-${index + 1}`}
                    >
                        <Header {...item} className={b('item-content')} />
                    </div>
                ))}
            </SliderBlock>
        </div>
    );
};

export default HeaderSliderBlock;
