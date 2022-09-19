import React, {useContext} from 'react';

import {block, getThemedValue} from '../../utils';
import {InfoBlockProps} from '../../models';
import {Grid, Row, Col} from '../../grid';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';

import './Info.scss';

const b = block('info-block');

export const InfoBlock = (props: InfoBlockProps) => {
    const {
        backgroundColor,
        theme: textTheme = 'dark',
        buttons,
        title,
        sectionsTitle,
        links,
    } = props;

    const {themeValue: theme} = useContext(ThemeValueContext);

    return (
        <div className={b({theme: textTheme})}>
            <div
                className={b('content')}
                style={{backgroundColor: getThemedValue(backgroundColor, theme)}}
            >
                <Grid>
                    <Row>
                        <Col sizes={{lg: 4, sm: 6, all: 12}}>
                            <h2 className={b('content-title')}>{title}</h2>
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
                            <h2 className={b('sections-title')}>{sectionsTitle}</h2>
                            <div className={b('links')}>
                                {links &&
                                    links.map((link, index) => (
                                        <Link
                                            {...link}
                                            key={index}
                                            className={b('link')}
                                            colorTheme={textTheme}
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
