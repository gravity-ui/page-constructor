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
    const path = ctx.id.split(' ')[0].replace('./', '') + '/';
    ctx.keys().forEach((key) => {
        const dirPath = key.replace(/^\.\//, path).replace(/\/readme\.md$/i, '');
        readmeCache[dirPath] = ctx(key).default;
    });
}

importAllReadme(require.context('../blocks', true, /readme\.md$/i));
importAllReadme(require.context('../sub-blocks', true, /readme\.md$/i));
importAllReadme(require.context('../components', true, /readme\.md$/i));

export const DocsWithReadme = () => {
    const context = React.useContext(DocsContext);
    const fileName = context?.parameters?.fileName;
    const kind = context.kind;
    let isComponent = false;
    if (kind && /Components|Blocks|Sub-blocks\//.test(kind)) {
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
                href={`https://bb.yandex-team.ru/projects/DATA-UI/repos/page-constructor/browse/${dirPath}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="https://badger.yandex-team.ru/custom/[Source]/[Bitbucket][green]/badge.svg" />
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
