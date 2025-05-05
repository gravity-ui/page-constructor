import * as React from 'react';

import {BackgroundImage, FileLink} from '../../components';
import {MobileContext} from '../../context/mobileContext';
import {useTheme} from '../../context/theme';
import {Col, Grid} from '../../grid';
import {ContentLayoutBlockProps, ContentSize, ContentTextSize} from '../../models';
import {Content} from '../../sub-blocks';
import {block, getThemedValue} from '../../utils';

import './ContentLayout.scss';

const b = block('content-layout-block');

function getFileTextSize(size: ContentSize) {
    switch (size) {
        case 's':
            return 's';
        case 'l':
        default:
            return 'l';
    }
}

function getTextWidth(size: ContentTextSize) {
    switch (size) {
        case 's':
            return {all: 12, md: 6};
        case 'l':
            return {all: 12, md: 12};
        case 'm':
        default:
            return {all: 12, md: 8};
    }
}

export const ContentLayoutBlock = (props: ContentLayoutBlockProps) => {
    const isMobile = React.useContext(MobileContext);
    const {
        textContent,
        fileContent,
        size = 'l',
        background,
        centered,
        theme = 'default',
        textWidth = 'm',
    } = props;

    const colSizes = React.useMemo(() => getTextWidth(textWidth), [textWidth]);
    const globalTheme = useTheme();
    const themedBackground = getThemedValue(background, globalTheme);

    return (
        <Grid>
            <div className={b({size, theme, background: Boolean(background)})}>
                <Content
                    className={b('content')}
                    {...textContent}
                    size={size}
                    centered={centered}
                    colSizes={colSizes}
                    theme={theme}
                />
                {fileContent && (
                    <Col className={b('files', {size, centered})} reset sizes={colSizes}>
                        {fileContent.map((file) => (
                            <FileLink
                                className={b('file')}
                                {...file}
                                key={file.href}
                                type="horizontal"
                                textSize={getFileTextSize(size)}
                                theme={theme}
                            />
                        ))}
                    </Col>
                )}
                {background && (
                    <div className={b('background')}>
                        <BackgroundImage
                            className={b('background-item')}
                            {...themedBackground}
                            hide={isMobile}
                        />
                    </div>
                )}
            </div>
        </Grid>
    );
};
export default ContentLayoutBlock;
