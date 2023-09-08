import React, {useContext} from 'react';

import {Label, LabelProps} from '@gravity-ui/uikit';

import {LocationContext} from '../../context/locationContext';
import {FileLinkProps, TextSize, WithChildren} from '../../models';
import {block, getLinkProps} from '../../utils';

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

const FileExtensionThemes = {
    [FileExtension.PDF]: 'danger',
    [FileExtension.DOC]: 'info',
    [FileExtension.XLS]: 'success',
    [FileExtension.PPT]: 'warning',
    [FileExtension.FIG]: 'normal',
    [FileExtension.ZIP]: 'unknown',
};

const LabelSizeMap: Record<TextSize, LabelProps['size']> = {
    l: 's',
    m: 's',
    s: 'xs',
    xs: 'xs',
};

const FileLink = (props: WithChildren<FileLinkProps>) => {
    const {hostname} = useContext(LocationContext);
    const {
        href,
        text,
        type = 'vertical',
        textSize = 'm',
        className,
        theme = 'default',
        onClick,
        tabIndex,
        urlTitle,
    } = props;
    const fileExt = getFileExt(href) as FileExtension;
    const labelTheme = (FileExtensionThemes[fileExt] || 'unknown') as LabelProps['theme'];
    const labelSize = LabelSizeMap[textSize];

    return (
        <div className={b({ext: fileExt, type, size: textSize, theme}, className)}>
            <Label className={b('file-label')} size={labelSize} theme={labelTheme}>
                {fileExt}
            </Label>
            <div className={b('link')}>
                <a
                    href={href}
                    onClick={onClick}
                    tabIndex={tabIndex}
                    title={urlTitle}
                    {...getLinkProps(href, hostname)}
                >
                    {text}
                </a>
            </div>
        </div>
    );
};

export default FileLink;
