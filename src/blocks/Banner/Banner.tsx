import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import {Grid, Row} from '../../gravity-blocks/grid';
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
                <Row>
                    <BannerCard {...bannerProps} />
                </Row>
            </Grid>
        </AnimateBlock>
    );
};

export default BannerBlock;
