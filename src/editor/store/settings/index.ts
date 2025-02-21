import * as React from 'react';

import {Theme} from '../../../models';
import {EditModeItem, ViewModeItem} from '../../types';

import {
    UPDATE_CODE_FULLSCREEN_MODE_ON,
    UPDATE_EDIT_MODE,
    UPDATE_THEME,
    UPDATE_VIEW_MODE,
    initialState,
    reducer,
} from './reducer';

export function useSettingsState() {
    const [{viewMode, editMode, theme, codeFullscreeModeOn}, dispatch] = React.useReducer(
        reducer,
        initialState,
    );

    return React.useMemo(() => {
        return {
            viewMode,
            editMode,
            theme,
            codeFullscreeModeOn,
            onViewModeUpdate: (newViewMode: ViewModeItem) =>
                dispatch({type: UPDATE_VIEW_MODE, payload: newViewMode}),
            onEditModeUpdate: (newEditMode: EditModeItem) =>
                dispatch({type: UPDATE_EDIT_MODE, payload: newEditMode}),
            onThemeUpdate: (newTheme: Theme) => dispatch({type: UPDATE_THEME, payload: newTheme}),
            onCodeFullscreeModeOnUpdate: (newCodeFullscreeModeOn: boolean) =>
                dispatch({type: UPDATE_CODE_FULLSCREEN_MODE_ON, payload: newCodeFullscreeModeOn}),
        };
    }, [viewMode, theme, codeFullscreeModeOn, editMode]);
}
