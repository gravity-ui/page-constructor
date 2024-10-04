import {ActionTypes} from './codes';

import {UnknownAction} from './index';

export interface InsertBlockAction extends UnknownAction {
    type: ActionTypes.InsertBlock;
    payload: {
        path: number[];
    };
}

export interface InsertModeEnableAction extends UnknownAction {
    type: ActionTypes.InsertModeEnable;
    payload: {
        blockType: string;
    };
}

export interface InsertModeDisableAction extends UnknownAction {
    type: ActionTypes.InsertModeDisable;
    payload: undefined;
}

export type InsertActions = InsertBlockAction | InsertModeEnableAction | InsertModeDisableAction;
