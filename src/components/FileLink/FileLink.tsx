import block from 'bem-cn-lite';
import React, {ReactNode, useContext} from 'react';

import {getLinkProps} from '../../utils';
import {TextSize} from '../../models';
import {MobileContext} from '../../context/mobileContext';

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

export type FileLinkType = 'vertical' | 'horizontal';

export interface FileLinkProps {
    href: string;
    text: ReactNode;
    type?: FileLinkType;
    textSize?: TextSize;
}

export function getFileExt(name: string) {
    if (name.includes(FIGMA_URL)) {
        return FileExtension.FIG;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return name && name.split('.').pop()!.toLowerCase();
}

const FileLink: React.FunctionComponent<FileLinkProps> = (props) => {
    const {useLocation} = useContext(MobileContext);
    const {hostname} = useLocation();
    const {href, text, type = 'vertical', textSize = 'm'} = props;
    const fileExt = getFileExt(href) as FileExtension;

    return (
        <div className={b({ext: fileExt, type, size: textSize})}>
            {Object.values(FileExtension).includes(fileExt) && (
                <div className={b('file-label')}>{fileExt}</div>
            )}
            <div className={b('link')}>
                <a href={href} {...getLinkProps(href, hostname)}>
                    {text}
                </a>
            </div>
        </div>
    );
};

export default FileLink;
