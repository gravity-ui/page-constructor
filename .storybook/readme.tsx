import {Markdown} from '@storybook/blocks';

// Remove the parts of a README that are redundant inside a Storybook docs page:
// - the leading `# Title` H1 (Storybook renders its own <Title/> via StoryTemplate)
// - the trailing `## Storybook` section (a self-referential link to this very page)
function cleanReadme(src: string): string {
    return src
        .replace(/^#\s+.+\n*/u, '')
        .replace(/\n*##\s+Storybook[\s\S]*$/iu, '')
        .trim();
}

export const Readme = ({children}: {children: string}) => (
    <Markdown>{cleanReadme(children)}</Markdown>
);
