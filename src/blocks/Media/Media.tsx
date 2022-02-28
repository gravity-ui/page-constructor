import React, {useContext, useMemo, useState} from 'react';

import {block, getThemedValue} from '../../utils';
import {Grid, Row, Col, GridColumnSize} from '../../grid';
import {MediaBlockProps} from '../../models';
import Media from '../../components/Media/Media';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import BlockHeader from '../../components/BlockHeader/BlockHeader';
import MediaContent from './MediaContent';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';

import './Media.scss';

const b = block('media-block');

const MediaBlock: React.FC<MediaBlockProps> = (props) => {
    const {
        title,
        description,
        button,
        media,
        largeMedia,
        direction = 'content-media',
        mobileDirection = 'content-media',
        animated,
        mediaOnly,
        links,
        disableShadow = false,
    } = props;

    const [play, setPlay] = useState<boolean>(false);
    const {themeValue: theme} = useContext(ThemeValueContext);
    const mediaThemed = getThemedValue(media, theme);

    const mediaSizes = useMemo(() => {
        return mediaOnly
            ? {[GridColumnSize.All]: 12}
            : {[GridColumnSize.Md]: largeMedia ? 8 : 6, [GridColumnSize.All]: 12};
    }, [mediaOnly, largeMedia]);

    const contentSizes = useMemo(() => {
        return {[GridColumnSize.Md]: largeMedia ? 4 : 6, [GridColumnSize.All]: 12};
    }, [largeMedia]);

    const mediaContent = !mediaOnly && (
        <MediaContent title={title} description={description} button={button} links={links} />
    );

    return (
        <AnimateBlock className={b()} onScroll={() => setPlay(true)} animate={animated}>
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
                    <Col sizes={mediaSizes}>
                        <div className={b('card', {shadow: !disableShadow})}>
                            <Media {...mediaThemed} playVideo={play} />
                        </div>
                    </Col>
                </Row>
            </Grid>
        </AnimateBlock>
    );
};

export default MediaBlock;
