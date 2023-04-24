import React from 'react';

import {AnimateBlock, FullWidthBackground, HTML, ImageBase, Link, Media} from '../../components';
import {Col, Grid, Row} from '../../grid';
import {SecurityBlockProps} from '../../models';
import {block} from '../../utils';

import './Security.scss';

const b = block('SecurityBlock');

export const SecurityBlock = (props: SecurityBlockProps) => {
    const {backgroundColor, theme = 'dark', title, points, media, animated} = props;

    return (
        <AnimateBlock className={b({theme})} offset={200} animate={animated}>
            <div className={b('content')}>
                <FullWidthBackground className={b('background')} style={{backgroundColor}} />
                <Grid>
                    <Row>
                        <Col>
                            <h2 className={b('title')}>{title}</h2>
                        </Col>
                    </Row>
                    {points && (
                        <Row className={b('points')}>
                            {points.map(({text, link, img}, index) => (
                                <Col key={index} className={b('point')} sizes={{sm: 4, all: 12}}>
                                    <ImageBase
                                        className={b('point-icon')}
                                        src={img}
                                        alt={text || 'point icon'}
                                    />
                                    <HTML className={b('point-text')} block={true}>
                                        {text}
                                    </HTML>
                                    {link && (
                                        <Link
                                            className={b('point-link')}
                                            text={link.text}
                                            url={link.url}
                                            theme={'normal'}
                                            arrow={true}
                                        />
                                    )}
                                </Col>
                            ))}
                        </Row>
                    )}
                    {media && (
                        <Row className={b('media')}>
                            <Col>
                                <Media className={b('media')} {...media} />
                            </Col>
                        </Row>
                    )}
                </Grid>
            </div>
        </AnimateBlock>
    );
};

export default SecurityBlock;
