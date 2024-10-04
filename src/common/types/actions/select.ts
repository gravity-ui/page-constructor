import {ActionTypes} from './codes';

import {UnknownAction} from './index';

export interface SelectBlockAction extends UnknownAction {
    type: ActionTypes.SelectBlock;
    payload: {
        path: number[];
        rect: DOMRect;
    };
}

export interface UpdateSelectedBlockRectAction extends UnknownAction {
    type: ActionTypes.UpdateSelectedBlockRect;
    payload: {
        rect: DOMRect;
    };
}

export type SelectActions = SelectBlockAction | UpdateSelectedBlockRectAction;
