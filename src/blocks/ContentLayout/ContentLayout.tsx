import React, {useContext, useMemo} from 'react';

import {block} from '../../utils';
import {ContentLayoutBlockProps, ContentSize, ContentTextSize, ReactFCC} from '../../models';
import {Content} from '../../sub-blocks';
import {BackgroundImage, FileLink} from '../../components';
import {Col} from '../../grid';
import {MobileContext} from '../../context/mobileContext';

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

export const ContentLayoutBlock: ReactFCC<ContentLayoutBlockProps> = (props) => {
    const isMobile = useContext(MobileContext);
    const {textContent, fileContent, properties: cardLayoutProperties = {size: 'l'}} = props;
    const {
        size = 'l',
        background,
        centered,
        theme = 'default',
        textWidth = 'm',
    } = cardLayoutProperties;

    const colSizes = useMemo(() => getTextWidth(textWidth), [textWidth]);

    return (
        <div className={b({size, background: Boolean(background)})}>
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
                        {...background}
                        hide={isMobile}
                    />
                </div>
            )}
        </div>
    );
};
export default ContentLayoutBlock;
