import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import {Grid} from '../../grid';
import {BannerBlockProps} from '../../models';
import {BannerCard} from '../../sub-blocks';
import {block} from '../../utils';

import './Banner.scss';

const b = block('banner-block');

export const BannerBlock = (props: BannerBlockProps) => {
    const {animated, className, ...bannerProps} = props;

    return (
        <AnimateBlock className={b(null, className)} animate={animated}>
            <Grid>
                <BannerCard {...bannerProps} />
            </Grid>
        </AnimateBlock>
    );
};

export default BannerBlock;
