import {block, getLinkProps} from '../../utils';
import React, {useContext} from 'react';

import {FileLinkProps} from '../../models';
import {LocationContext} from '../../context/locationContext';

import './FileLink.scss';

const b = block('file-link');

const FIGMA_URL = 'https://www.figma.com';

export enum FileExtension {
    PDF = 'pdf',
    DOC = 'doc',
    XLS = 'xls',
    PPT = 'ppt',
    FIG = 'fig',
    ZIP = 'zip',
}

export function getFileExt(name: string) {
    if (name.includes(FIGMA_URL)) {
        return FileExtension.FIG;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return name && name.split('.').pop()!.toLowerCase();
}

const FileLink: React.FC<FileLinkProps> = (props) => {
    const {hostname} = useContext(LocationContext);
    const {
        href,
        text,
        type = 'vertical',
        textSize = 'm',
        className,
        theme = 'default',
        onClick,
    } = props;
    const fileExt = getFileExt(href) as FileExtension;

    return (
        <div className={b({ext: fileExt, type, size: textSize, theme}, className)}>
            {Object.values(FileExtension).includes(fileExt) && (
                <div className={b('file-label')}>{fileExt}</div>
            )}
            <div className={b('link')}>
                <a href={href} {...getLinkProps(href, hostname)} onClick={onClick}>
                    {text}
                </a>
            </div>
        </div>
    );
};

export default FileLink;
