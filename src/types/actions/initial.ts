import {ConfigInput} from '../dynamic-form';
import {ItemConfig} from '../index';

import {ActionTypes} from './codes';

import {UnknownAction} from './index';

export interface IframeReadyAction extends UnknownAction {
    type: ActionTypes.IframeReady;
    payload: {
        height: number;
    };
}

export interface EditorReadyAction extends UnknownAction {
    type: ActionTypes.EditorReady;
    payload: unknown;
}

export interface BlocksConfigsAction extends UnknownAction {
    type: ActionTypes.BlocksConfigs;
    payload: {
        blocks: ItemConfig[];
        subBlocks: ItemConfig[];
        global: ConfigInput[];
    };
}

export type InitialActions = BlocksConfigsAction | IframeReadyAction | EditorReadyAction;
