import _ from 'lodash';

export const formatBlockName = (name: string) => _.capitalize(name).replace(/(block|-)/g, ' ');

export const getBlockIndexFromId = (blockId?: string) => Number(blockId?.split('-')?.at(-1));
