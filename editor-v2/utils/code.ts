import yaml from 'js-yaml';

import {PageContent} from '../../src/models';

export function parseCode(code: string) {
    const pageContent = yaml.load(code) as PageContent;

    return {
        ...pageContent,
        blocks: pageContent.blocks?.filter(Boolean),
    };
}
