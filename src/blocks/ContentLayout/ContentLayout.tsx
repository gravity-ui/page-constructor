import React from 'react';

import {block} from '../../utils';
import {ContentLayoutBlockProps, ContentSize} from '../../models';
import Content from '../../components/Content/Content';
import {FileLink} from '../../components';

import './ContentLayout.scss';

const b = block('content-layout-block');

function getFileTextSize(size: ContentSize) {
    switch (size) {
        case 'l':
            return 'l';
        case 's':
            return 's';
        default:
            return 'l';
    }
}

const ContentLayoutBlock: React.FC<ContentLayoutBlockProps> = (props) => {
    const {textContent, fileContent, properties = {size: 'l'}} = props;
    const {size} = properties;

    return (
        <div className={b({size})}>
            <Content {...textContent} size={size} />
            {fileContent && (
                <div className={b('files', {size})}>
                    {fileContent.map((file) => (
                        <FileLink
                            className={b('file')}
                            {...file}
                            key={file.href}
                            type="horizontal"
                            textSize={getFileTextSize(size)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
export default ContentLayoutBlock;
