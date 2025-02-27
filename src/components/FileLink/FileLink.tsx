import * as React from 'react';

import {Label, LabelProps} from '@gravity-ui/uikit';

import {LocationContext} from '../../context/locationContext';
import {FileLinkProps, TextSize} from '../../models';
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
    if (name?.includes(FIGMA_URL)) {
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
    sm: 's',
    s: 'xs',
    xs: 'xs',
};

function getTextSize(size: TextSize) {
    if (size === 'sm') {
        return 'm';
    }

    return size;
}

const FileLink = (props: React.PropsWithChildren<FileLinkProps>) => {
    const {hostname} = React.useContext(LocationContext);
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
        extraProps,
    } = props;
    const fileExt = getFileExt(href) as FileExtension;
    const labelTheme = (FileExtensionThemes[fileExt] || 'unknown') as LabelProps['theme'];
    const labelSize = LabelSizeMap[textSize];

    return (
        <div className={b({ext: fileExt, type, size: getTextSize(textSize), theme}, className)}>
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
                    {...extraProps}
                >
                    {text}
                </a>
            </div>
        </div>
    );
};

export default FileLink;
