import {getCreateReadableConfig} from './config';
import {BlockType} from 'models/blog';

type CreateReadableContentPropsType = {
    blocks: {
        [x: string]: any;
        type: BlockType.BlogYFMBlock | BlockType.BlogColoredTextBlock | BlockType.BlogMediaBlock;
    }[];
    content?: string;
    authors?: unknown[];
};

/**
 *  Function for create readable content
 *
 * @param blocks - content blocks array
 * @param content - content data
 * @param authors - authors array
 *
 * @returns readable content
 */
export const createReadableContent = ({
    content = '',
    blocks,
    authors = [],
}: CreateReadableContentPropsType) => {
    const config = getCreateReadableConfig();

    const readableContent = blocks.reduce((resultContent: string, block) => {
        let innerContent = resultContent;

        if (config[block.type]) {
            innerContent += config[block.type].fields
                .map((field: string) => block[field])
                .filter(Boolean)
                .join('\n');
            innerContent += '\n';
        }

        // @ts-ignore
        if (block.type === BlockType.BlogAuthorBlock) {
            authors.push(block.uid);
        }

        if (block.children && block.children.length) {
            innerContent = createReadableContent({
                content: innerContent,
                blocks: block.children,
                authors,
            });
        }

        return innerContent;
    }, content);

    return readableContent;
};
