import {SpecTypes} from '@gravity-ui/dynamic-forms';

export const getFiedValidator = (type: SpecTypes) =>
    type === SpecTypes.Number ? 'number' : 'base';
