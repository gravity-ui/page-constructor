import _ from 'lodash';

export const formatBlockName = (name: string) => _.capitalize(name).replace(/(block|-)/g, ' ');
