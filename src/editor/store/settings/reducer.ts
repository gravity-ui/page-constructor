import {DEFAULT_THEME} from '../../../components/constants';
import {Theme} from '../../../models';
import {FormTab, ViewModeItem} from '../../types';

// actions
export const UPDATE_FORM_TAB = 'UPDATE_FORM_TAB';
export const UPDATE_CODE_FULLSCREEN_MODE_ON = 'UPDATE_CODE_FULLSCREEN_MODE_ON';
export const UPDATE_VIEW_MODE = 'UPDATE_VIEW_MODE';
export const UPDATE_THEME = 'UPDATE_THEME';

interface EditorSettingsState {
    theme: Theme;
    viewMode: ViewModeItem;
    codeFullscreeModeOn: boolean;
    formTab: FormTab;
}

interface UpdateViewMode {
    type: typeof UPDATE_VIEW_MODE;
    payload: ViewModeItem;
}

interface UpdateTheme {
    type: typeof UPDATE_THEME;
    payload: Theme;
}

interface UpdateCodeFullscreenModeOn {
    type: typeof UPDATE_CODE_FULLSCREEN_MODE_ON;
    payload: boolean;
}

interface UpdateFormTab {
    type: typeof UPDATE_FORM_TAB;
    payload: FormTab;
}

export type EditorSettingsAction =
    | UpdateViewMode
    | UpdateTheme
    | UpdateCodeFullscreenModeOn
    | UpdateFormTab;

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
        case UPDATE_FORM_TAB:
            return {
                ...state,
                formTab: action.payload,
            };
        default:
            return state;
    }
};

export const initialState = {
    viewMode: ViewModeItem.Edititng,
    theme: DEFAULT_THEME,
    codeFullscreeModeOn: false,
    formTab: FormTab.Blocks,
};
