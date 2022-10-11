import React, {useContext} from 'react';

import {block, getThemedValue} from '../../utils';
import {InfoBlockProps, LinkTheme} from '../../models';
import {Grid, Row, Col} from '../../grid';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
import Content from '../../sub-blocks/Content/Content';

import './Info.scss';

const b = block('info-block');
const sizes = {md: 6, all: 12};
const colSizes = {all: 12, md: 12};
const contentClassName = b('content');

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
                                theme={contentTheme}
                                buttons={leftButtons}
                                additionalInfo={leftContent?.additionalInfo}
                                colSizes={colSizes}
                                className={contentClassName}
                            />
                        </Col>
                        <Col sizes={sizes} className={b('right')}>
                            <Content
                                title={sectionsTitle || rightContent?.title}
                                text={rightContent?.text}
                                links={rightLinks}
                                theme={contentTheme}
                                buttons={rightContent?.buttons}
                                additionalInfo={rightContent?.additionalInfo}
                                colSizes={colSizes}
                                className={contentClassName}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        </div>
    );
};

export default InfoBlock;
