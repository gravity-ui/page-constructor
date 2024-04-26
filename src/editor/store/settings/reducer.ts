import {DEFAULT_THEME} from '../../../components/constants';
import {Theme} from '../../../models';
import {EditModeItem, ViewModeItem} from '../../types';

// actions
export const UPDATE_CODE_FULLSCREEN_MODE_ON = 'UPDATE_CODE_FULLSCREEN_MODE_ON';
export const UPDATE_VIEW_MODE = 'UPDATE_VIEW_MODE';
export const UPDATE_EDIT_MODE = 'UPDATE_EDIT_MODE';
export const UPDATE_THEME = 'UPDATE_THEME';

interface EditorSettingsState {
    theme: Theme;
    viewMode: ViewModeItem;
    editMode: EditModeItem;
    codeFullscreeModeOn: boolean;
}

interface UpdateViewMode {
    type: typeof UPDATE_VIEW_MODE;
    payload: ViewModeItem;
}

interface UpdateEditMode {
    type: typeof UPDATE_EDIT_MODE;
    payload: EditModeItem;
}

interface UpdateTheme {
    type: typeof UPDATE_THEME;
    payload: Theme;
}

interface UpdateCodeFullscreenModeOn {
    type: typeof UPDATE_CODE_FULLSCREEN_MODE_ON;
    payload: boolean;
}

export type EditorSettingsAction =
    | UpdateViewMode
    | UpdateEditMode
    | UpdateTheme
    | UpdateCodeFullscreenModeOn;

// reducer
export const reducer = (
    state: EditorSettingsState,
    action: EditorSettingsAction,
): EditorSettingsState => {
    switch (action.type) {
        case UPDATE_VIEW_MODE:
            return {
                ...state,
                viewMode: action.payload,
            };
        case UPDATE_EDIT_MODE:
            return {
                ...state,
                editMode: action.payload,
            };
        case UPDATE_THEME:
            return {
                ...state,
                theme: action.payload,
            };
        case UPDATE_CODE_FULLSCREEN_MODE_ON:
            return {
                ...state,
                codeFullscreeModeOn: action.payload,
            };
        default:
            return state;
    }
};

export const initialState = {
    viewMode: ViewModeItem.Desktop,
    editMode: EditModeItem.Form,
    theme: DEFAULT_THEME,
    codeFullscreeModeOn: false,
};
