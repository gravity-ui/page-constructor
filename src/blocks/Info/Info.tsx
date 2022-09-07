import React, {useContext} from 'react';

import {block, getThemedValue} from '../../utils';
import {InfoBlockProps} from '../../models';
import {Grid, Row, Col} from '../../grid';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
import Content from '../../components/Content/Content';

import './Info.scss';

const b = block('info-block');

export const InfoBlock: React.FC<InfoBlockProps> = (props) => {
    const {
        backgroundColor,
        theme: blockTheme = 'dark',
        buttons,
        title,
        sectionsTitle,
        links,
        rightContent = {},
        leftContent = {},
    } = props;

    const {themeValue: theme} = useContext(ThemeValueContext);
    const contentTheme = blockTheme === 'dark' ? 'dark' : 'default';
    const sizes = {md: 6, all: 12};

    return (
        <div className={b()}>
            <div
                className={b('content')}
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
                                buttons={buttons || leftContent?.buttons}
                                additionalInfo={leftContent?.additionalInfo}
                                colSizes={{all: 12, md: 12}}
                            />
                        </Col>
                        <Col sizes={sizes} className={b('right')}>
                            <Content
                                title={sectionsTitle || rightContent?.title}
                                text={rightContent?.text}
                                links={
                                    links?.map((link) => ({
                                        ...link,
                                        arrow: true,
                                        theme: 'normal',
                                    })) || rightContent?.links
                                }
                                theme={contentTheme}
                                buttons={rightContent?.buttons}
                                additionalInfo={rightContent?.additionalInfo}
                                colSizes={{all: 12, md: 12}}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        </div>
    );
};

export default InfoBlock;
