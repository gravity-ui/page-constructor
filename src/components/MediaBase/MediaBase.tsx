import * as React from 'react';

import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import {Col, Grid, GridColumnSize, Row} from '../../grid';
import {MediaBaseBlockProps} from '../../models';
import {block} from '../../utils';
import Title from '../Title/Title';

import MediaContent from './MediaBaseContent';

import './MediaBase.scss';

const b = block('media-base');

const Card: (props: React.PropsWithChildren<{}>) => React.ReactElement | null = () => null;

interface MediaBaseProps extends MediaBaseBlockProps {
    children: React.ReactElement;
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
        onScroll,
        mediaOnlyColSizes = {all: 12, md: 8},
        ...mediaContentProps
    } = props;
    const {title, description} = mediaContentProps;

    const mediaSizes = React.useMemo(() => {
        return mediaOnly
            ? {[GridColumnSize.All]: 12}
            : {[GridColumnSize.Md]: largeMedia ? 8 : 6, [GridColumnSize.All]: 12};
    }, [mediaOnly, largeMedia]);

    const contentSizes = React.useMemo(() => {
        return {[GridColumnSize.Md]: largeMedia ? 4 : 6, [GridColumnSize.All]: 12};
    }, [largeMedia]);

    const mediaContent = !mediaOnly && <MediaContent {...mediaContentProps} />;
    const card = children.type === Card ? children?.props.children : null;

    return (
        <AnimateBlock className={b()} onScroll={onScroll} animate={animated}>
            {mediaOnly && (
                <Title
                    className={b('header')}
                    title={title}
                    subtitle={description}
                    colSizes={mediaOnlyColSizes}
                />
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
                            <div className={b('card')}>{card}</div>
                        </Col>
                    ) : null}
                </Row>
            </Grid>
        </AnimateBlock>
    );
};

MediaBase.Card = Card;

export default MediaBase;
