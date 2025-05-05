import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import BalancedMasonry from '../../components/BalancedMasonry/BalancedMasonry';
import FullWidthBackground from '../../components/FullWidthBackground/FullWidthBackground';
import Media from '../../components/Media/Media';
import Title from '../../components/Title/Title';
import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import {BREAKPOINTS} from '../../constants';
import {useTheme} from '../../context/theme';
import {Grid} from '../../grid';
import {PromoFeaturesProps} from '../../models';
import {block, getThemedValue} from '../../utils';
import {mergeVideoMicrodata} from '../../utils/microdata';

import './PromoFeaturesBlock.scss';

const b = block('PromoFeaturesBlock');

const breakpointColumns = {
    [BREAKPOINTS.lg]: 3,
    [BREAKPOINTS.md]: 2,
    [BREAKPOINTS.sm]: 1,
};

const PromoFeaturesBlock = (props: PromoFeaturesProps) => {
    const {items, title, description, theme, animated = true} = props;
    const backgroundTheme = theme || 'default';
    const globalTheme = useTheme();

    return (
        <Grid>
            <AnimateBlock className={b({[backgroundTheme]: true})} animate={animated}>
                <FullWidthBackground className={b('background', {[backgroundTheme]: true})} />
                <Title title={title} subtitle={description} className={b('header')} />
                <BalancedMasonry
                    breakpointCols={breakpointColumns}
                    className={b('card-container')}
                    columnClassName={b('card-container-column')}
                >
                    {items &&
                        items.map(({title: cardTitle, text, media, theme: cardTheme}, index) => {
                            const blockModifier =
                                backgroundTheme === 'default' ? 'default' : 'light';
                            const themeMod = cardTheme || blockModifier || '';
                            const themedMedia = getThemedValue(media, globalTheme);
                            const allProps = mergeVideoMicrodata(themedMedia, {
                                name: cardTitle,
                                description: text,
                            });

                            return (
                                <div
                                    key={index}
                                    className={b('card', {
                                        'no-media': !media,
                                        [themeMod]: Boolean(themeMod),
                                    })}
                                >
                                    <div className={b('card-info')}>
                                        <h3 className={b('card-title')}>{cardTitle}</h3>
                                        <div className={b('card-text')}>
                                            <YFMWrapper
                                                content={text}
                                                modifiers={{constructor: true}}
                                            />
                                        </div>
                                    </div>
                                    {media && <Media className={b('card-media')} {...allProps} />}
                                </div>
                            );
                        })}
                </BalancedMasonry>
            </AnimateBlock>
        </Grid>
    );
};

export default PromoFeaturesBlock;
