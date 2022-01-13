import React from 'react';
import {
    Title,
    DocsContext,
    Subtitle,
    Description,
    Primary,
    ArgsTable,
    Stories,
    PRIMARY_STORY,
} from '@storybook/addon-docs/';

const readmeCache: Record<string, string> = {};

function importAllReadme(ctx: __WebpackModuleApi.RequireContext) {
    ctx.keys().forEach((key) => {
        const dirPath = key.replace(/^\.\//, 'src/components/').replace(/\/readme\.md$/i, '');
        readmeCache[dirPath] = ctx(key);
    });
}

importAllReadme(require.context('../components', true, /readme\.md$/i));

export const DocsWithReadme = () => {
    const context = React.useContext(DocsContext);
    const fileName = context.parameters.fileName;
    const kind = context.kind;
    let isComponent = false;
    if (kind && kind.includes('Компоненты/')) {
        isComponent = true;
    }

    let dirPath;
    if (isComponent && fileName) {
        const pathArr = fileName.split('/');
        dirPath = pathArr.slice(1, pathArr.length - 2).join('/');
    }

    let sourceBadgeContent;
    if (dirPath) {
        sourceBadgeContent = (
            <a
                href={`https://github.yandex-team.ru/data-ui/page-constructor/tree/master/${dirPath}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="https://badger.yandex-team.ru/custom/[Исходники]/[Github][green]/badge.svg" />
            </a>
        );
    }

    let readmeContent;
    if (dirPath && readmeCache[dirPath]) {
        readmeContent = (
            <div
                className="yfm yfm_only-light"
                dangerouslySetInnerHTML={{__html: readmeCache[dirPath]}}
            />
        );
    }

    return (
        <>
            <Title />
            {sourceBadgeContent}
            <Subtitle />
            <Description />
            {readmeContent}
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />
            <Stories />
        </>
    );
};
