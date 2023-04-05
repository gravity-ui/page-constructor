import React, {useContext} from 'react';

import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
import {Col, Grid, Row} from '../../grid';
import {ContentTheme, InfoBlockProps, LinkTheme} from '../../models';
import Content from '../../sub-blocks/Content/Content';
import {block, getThemedValue} from '../../utils';

import './Info.scss';

const b = block('info-block');
const sizes = {md: 6, all: 12};

export const InfoBlock = (props: InfoBlockProps) => {
    const {
        backgroundColor,
        theme: blockTheme = 'dark',
        buttons = [],
        title,
        sectionsTitle,
        links = [],
        rightContent = {},
        leftContent = {},
    } = props;

    const {themeValue: theme} = useContext(ThemeValueContext);
    const contentTheme = blockTheme === 'dark' ? 'dark' : 'default';
    const rightLinks = [
        ...(rightContent?.links || []),
        ...links.map((link) => ({
            ...link,
            arrow: true,
            theme: 'normal' as LinkTheme,
        })),
    ];
    const leftButtons = [...buttons, ...(leftContent?.buttons || [])];
    const commonProps = {
        colSizes: {all: 12, md: 12},
        className: b('content'),
        theme: contentTheme as ContentTheme,
    };

    return (
        <div className={b()}>
            <div
                className={b('container')}
                style={{backgroundColor: getThemedValue(backgroundColor, theme)}}
            >
                <Grid>
                    <Row>
                        <Col sizes={sizes} className={b('left')}>
                            <Content
                                title={title || leftContent?.title}
                                text={leftContent?.text}
                                links={leftContent?.links}
                                buttons={leftButtons}
                                additionalInfo={leftContent?.additionalInfo}
                                {...commonProps}
                            />
                        </Col>
                        <Col sizes={sizes} className={b('right')}>
                            <Content
                                title={sectionsTitle || rightContent?.title}
                                text={rightContent?.text}
                                links={rightLinks}
                                buttons={rightContent?.buttons}
                                additionalInfo={rightContent?.additionalInfo}
                                {...commonProps}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        </div>
    );
};

export default InfoBlock;
