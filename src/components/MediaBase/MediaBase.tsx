import React, {useMemo, ReactElement} from 'react';

import {block} from '../../utils';
import {Grid, Row, Col, GridColumnSize} from '../../grid';
import {MediaBaseBlockProps, WithChildren} from '../../models';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import BlockHeader from '../../components/BlockHeader/BlockHeader';
import MediaContent from './MediaBaseContent';

import './MediaBase.scss';

const b = block('media-base');

const Card: React.FC<WithChildren<{}>> = () => null;

interface MediaBaseProps extends MediaBaseBlockProps {
    children: ReactElement;
    onScroll?: () => void;
}

export const MediaBase = (props: MediaBaseProps) => {
    const {
        children,
        largeMedia,
        direction = 'content-media',
        mobileDirection = 'content-media',
        animated,
        mediaOnly,
        disableShadow = false,
        onScroll,
        ...mediaContentProps
    } = props;
    const {title, description} = mediaContentProps;

    const mediaSizes = useMemo(() => {
        return mediaOnly
            ? {[GridColumnSize.All]: 12}
            : {[GridColumnSize.Md]: largeMedia ? 8 : 6, [GridColumnSize.All]: 12};
    }, [mediaOnly, largeMedia]);

    const contentSizes = useMemo(() => {
        return {[GridColumnSize.Md]: largeMedia ? 4 : 6, [GridColumnSize.All]: 12};
    }, [largeMedia]);

    const mediaContent = !mediaOnly && <MediaContent {...mediaContentProps} />;
    const card = children.type === Card ? children?.props.children : null;

    return (
        <AnimateBlock className={b()} onScroll={onScroll} animate={animated}>
            {mediaOnly && (
                <BlockHeader className={b('header')} title={title} description={description} />
            )}
            <Grid>
                <Row
                    className={b('row', {
                        reverse: direction === 'media-content',
                        'mobile-reverse': mobileDirection === 'media-content',
                    })}
                >
                    <Col className={b('content')} sizes={contentSizes}>
                        {mediaContent}
                    </Col>
                    {card ? (
                        <Col sizes={mediaSizes}>
                            <div className={b('card', {shadow: !disableShadow})}>{card}</div>
                        </Col>
                    ) : null}
                </Row>
            </Grid>
        </AnimateBlock>
    );
};

MediaBase.Card = Card;

export default MediaBase;
