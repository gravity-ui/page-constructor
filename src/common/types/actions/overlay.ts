import {ActionTypes} from './codes';

import {UnknownAction} from './index';

export interface OverlayModeOnMoveAction extends UnknownAction {
    type: ActionTypes.OverlayModeOnMove;
    payload: {
        block?: {
            rect: DOMRect;
            cursorPosition: 'top' | 'bottom' | 'left' | 'right';
        };
        cursor: {x: number; y: number};
    };
}

export type OverlayActions = OverlayModeOnMoveAction;
