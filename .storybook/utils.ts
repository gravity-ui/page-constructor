import yfm from '@diplodoc/transform';

export const yfmTransform = (content: string) => yfm(content).result.html;
