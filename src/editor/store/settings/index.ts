import {useMemo, useReducer} from 'react';

import {Theme} from '../../../models';
import {FormTab, ViewModeItem} from '../../types';

import {
    UPDATE_CODE_FULLSCREEN_MODE_ON,
    UPDATE_FORM_TAB,
    UPDATE_THEME,
    UPDATE_VIEW_MODE,
    initialState,
    reducer,
} from './reducer';

export function useSettingsState() {
    const [{formTab, viewMode, theme, codeFullscreeModeOn}, dispatch] = useReducer(
        reducer,
        initialState,
    );

    return useMemo(() => {
        return {
            formTab,
            viewMode,
            theme,
            codeFullscreeModeOn,
            onFormTabUpdate: (newFormTab: FormTab) =>
                dispatch({type: UPDATE_FORM_TAB, payload: newFormTab}),
            onViewModeUpdate: (newViewMode: ViewModeItem) =>
                dispatch({type: UPDATE_VIEW_MODE, payload: newViewMode}),
            onThemeUpdate: (newTheme: Theme) => dispatch({type: UPDATE_THEME, payload: newTheme}),
            onCodeFullscreeModeOnUpdate: (newCodeFullscreeModeOn: boolean) =>
                dispatch({type: UPDATE_CODE_FULLSCREEN_MODE_ON, payload: newCodeFullscreeModeOn}),
        };
    }, [formTab, viewMode, theme, codeFullscreeModeOn]);
}
