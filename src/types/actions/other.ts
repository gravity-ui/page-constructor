import {PageContent} from '../../models';

import {ActionTypes} from './codes';

import {UnknownAction} from './index';

export interface UpdateConfigsAction extends UnknownAction {
    type: ActionTypes.UpdateConfigs;
    payload: {
        content: PageContent;
    };
}

export interface SetHeightAction extends UnknownAction {
    type: ActionTypes.SetHeight;
    payload: {
        height: number;
    };
}

export type OtherActions = UpdateConfigsAction | SetHeightAction;
