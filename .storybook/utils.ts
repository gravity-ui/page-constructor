import yfm from '@doc-tools/transform';

export const yfmTransform = (content: string) => yfm(content).result.html;
