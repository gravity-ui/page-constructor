import {ActionTypes} from './codes';

import {UnknownAction} from './index';

export interface ReorderModeEnableAction extends UnknownAction {
    type: ActionTypes.ReorderModeEnable;
    payload: undefined;
}

export interface ReorderModeDisableAction extends UnknownAction {
    type: ActionTypes.ReorderModeDisable;
    payload: undefined;
}

export interface ReorderBlocksAction extends UnknownAction {
    type: ActionTypes.ReorderBlocks;
    payload: {
        path: number[];
    };
}

export type ReorderActions =
    | ReorderBlocksAction
    | ReorderModeEnableAction
    | ReorderModeDisableAction;
