import React from 'react';
import block from 'bem-cn-lite';
import {BREAKPOINTS} from '../../../../constants';
import YFMWrapper from 'components/YFMWrapper/YFMWrapper';

import {PromoFeaturesProps} from 'units/constructor/models';
import Media from 'units/constructor/components/Media/Media';
import BlockHeader from 'units/constructor/components/BlockHeader/BlockHeader';
import AnimateBlock from 'units/constructor/components/AnimateBlock/AnimateBlock';
import FullWidthBackground from 'components/FullWidthBackground/FullWidthBackground';
import BalancedMasonry from 'units/constructor/components/BalancedMasonry/BalancedMasonry';

import './PromoFeaturesBlock.scss';

const b = block('PromoFeaturesBlock');

const breakpointColumns = {
    [BREAKPOINTS.lg]: 3,
    [BREAKPOINTS.md]: 2,
    [BREAKPOINTS.sm]: 1,
};

export default function PromoFeaturesBlock(props: PromoFeaturesProps) {
    const {items, title, description, theme, animated = true} = props;
    const backgroundTheme = theme || 'default';

    return (
        <AnimateBlock className={b({[backgroundTheme]: true})} animate={animated}>
            <FullWidthBackground className={b('background', {[backgroundTheme]: true})} />
            <BlockHeader title={title} description={description} className={b('header')} />
            <BalancedMasonry
                breakpointCols={breakpointColumns}
                className={b('card-container')}
                columnClassName={b('card-container-column')}
            >
                {items.map(({title: cardTitle, text, media, theme: cardTheme}, index) => {
                    const blockModifier = backgroundTheme === 'default' ? 'default' : 'light';
                    const themeMod = cardTheme || blockModifier || '';

                    return (
                        <div
                            key={index}
                            className={b('card', {
                                'no-media': !media,
                                [themeMod]: Boolean(themeMod),
                            })}
                        >
                            <div className={b('card-info')}>
                                <h4 className={b('card-title')}>{cardTitle}</h4>
                                <div className={b('card-text')}>
                                    <YFMWrapper content={text} />
                                </div>
                            </div>
                            {media && <Media className={b('card-media')} {...media} />}
                        </div>
                    );
                })}
            </BalancedMasonry>
        </AnimateBlock>
    );
}
