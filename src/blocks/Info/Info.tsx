import React from 'react';
import block from 'bem-cn-lite';

import {InfoBlockProps} from '../../models';
import FullWidthBackground from '../../components/FullWidthBackground/FullWidthBackground';
import {Grid, Row, Col} from '../../grid';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';

import './Info.scss';

const b = block('info-block');

const InfoBlock: React.FC<InfoBlockProps> = (props) => {
    const {backgroundColor, theme = 'dark', buttons, title, sectionsTitle, links} = props;

    return (
        <div className={b({theme})}>
            <div className={b('content')}>
                <FullWidthBackground className={b('background')} style={{backgroundColor}} />
                <Grid>
                    <Row>
                        <Col sizes={{lg: 4, sm: 6, all: 12}}>
                            <h2>{title}</h2>
                            {buttons && (
                                <div className={b('buttons')}>
                                    {buttons.map((button, index) => (
                                        <Button
                                            key={index}
                                            className={b('button')}
                                            size="xl"
                                            {...button}
                                        />
                                    ))}
                                </div>
                            )}
                        </Col>
                        <Col sizes={{lg: 4, sm: 6, all: 12}} offsets={{lg: 2, md: 0}}>
                            <h2>{sectionsTitle}</h2>
                            <div className={b('links')}>
                                {links &&
                                    links.map((link, index) => (
                                        <Link
                                            {...link}
                                            key={index}
                                            className={b('link')}
                                            colorTheme={theme}
                                            theme={'normal'}
                                            arrow={true}
                                        />
                                    ))}
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        </div>
    );
};

export default InfoBlock;
