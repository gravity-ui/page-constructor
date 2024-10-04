import {InitialActions} from './initial';
import {InsertActions} from './insert';
import {OtherActions} from './other';
import {OverlayActions} from './overlay';
import {ReorderActions} from './reorder';
import {SelectActions} from './select';

export type BaseAction<T extends string = string> = {
    type: T;
};

export interface UnknownAction extends BaseAction {
    // Allows any extra properties to be defined in an action.
    [extraProps: string]: unknown;
}

export type Action =
    | InitialActions
    | InsertActions
    | OverlayActions
    | ReorderActions
    | SelectActions
    | OtherActions;

export * from './initial';
export * from './insert';
export * from './other';
export * from './overlay';
export * from './reorder';
export * from './select';
export * from './codes';
