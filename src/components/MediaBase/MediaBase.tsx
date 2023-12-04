import React, {ReactElement, useCallback, useMemo} from 'react';

import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import {Col, Grid, GridColumnSize, Row} from '../../grid';
import {MediaBaseBlockProps, WithChildren} from '../../models';
import {block} from '../../utils';
import Title from '../Title/Title';

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
        mediaSize,
        direction = 'content-media',
        mobileDirection = 'content-media',
        animated,
        mediaOnly,
        disableShadow = false,
        onScroll,
        ...mediaContentProps
    } = props;
    const {title, description} = mediaContentProps;

    const getSize = useCallback(
        (isMedia: boolean) => {
            if (isMedia) {
                if (mediaSize === 'large') {
                    return 8;
                } else if (mediaSize === 'small') {
                    return 4;
                }
                return 6;
            } else {
                if (mediaSize === 'large') {
                    return 4;
                } else if (mediaSize === 'small') {
                    return 8;
                }
                return 6;
            }
        },
        [mediaSize],
    );

    const mediaSizes = useMemo(() => {
        return mediaOnly
            ? {[GridColumnSize.All]: 12}
            : {
                  [GridColumnSize.Md]: getSize(true),
                  [GridColumnSize.All]: 12,
              };
    }, [mediaOnly, getSize]);

    const contentSizes = useMemo(() => {
        return {
            [GridColumnSize.Md]: getSize(false),
            [GridColumnSize.All]: 12,
        };
    }, [getSize]);

    const mediaContent = !mediaOnly && <MediaContent {...mediaContentProps} />;
    const card = children.type === Card ? children?.props.children : null;

    return (
        <AnimateBlock className={b()} onScroll={onScroll} animate={animated}>
            {mediaOnly && (
                <Title
                    className={b('header')}
                    title={title}
                    subtitle={description}
                    colSizes={{all: 12}}
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
