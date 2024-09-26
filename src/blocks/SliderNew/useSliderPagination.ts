import {Swiper as SwiperProps} from 'swiper/swiper-react';

import {setElementAtrributes} from './utils';

export const useSliderPagination = (props: {
    enabled: boolean;
    isA11yControlHidden: boolean;
    controlTabIndex: number;
    bulletClass: string;
    bulletActiveClass: string;
    paginationLabel: string;
}): Pick<SwiperProps, 'pagination' | 'onPaginationUpdate'> | undefined => {
    if (!props.enabled) {
        return undefined;
    }

    const {isA11yControlHidden, controlTabIndex, bulletClass, bulletActiveClass, paginationLabel} =
        props;

    return {
        pagination: {
            clickable: true,
            bulletClass,
            bulletActiveClass,
        },
        onPaginationUpdate: (slider) => {
            const pagination = slider.pagination.el;

            setElementAtrributes(pagination, {
                role: 'menu',
                'aria-hidden': isA11yControlHidden,
                'aria-label': paginationLabel,
            });

            const bullets = pagination.querySelectorAll(`.${bulletClass}`);

            bullets.forEach((bullet) => {
                const isActive = bullet.classList.contains(bulletActiveClass);

                setElementAtrributes(bullet, {
                    role: 'menuitemradio',
                    'aria-hidden': isA11yControlHidden,
                    'aria-checked': isActive,
                    tabindex: controlTabIndex,
                });
            });
        },
    };
};
