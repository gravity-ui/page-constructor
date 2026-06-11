import capitalize from 'lodash/capitalize';

import {BlockWrapperDataProps} from '../../models';
import {ViewModeItem} from '../types';

export const formatBlockName = (name: string) => capitalize(name).replace(/(block|-)/g, ' ');

export const getBlockId = ({index, type}: BlockWrapperDataProps) =>
    `${type}${index === undefined ? '' : `-${index}`}`;

export const checkIsMobile = (viewMode: ViewModeItem) =>
    [ViewModeItem.Mobile, ViewModeItem.Tablet].includes(viewMode);
