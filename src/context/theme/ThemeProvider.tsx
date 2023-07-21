import React, {PropsWithChildren} from 'react';

import {Theme} from '../../models';

import {ThemeContext, ThemeContextProps} from './ThemeContext';

interface ThemeProviderExternalProps {}

interface ThemeProviderDefaultProps {
    defaultTheme: Theme;
    onThemeSwitch?: (theme: Theme) => void;
}

export interface ThemeProviderProps
    extends ThemeProviderExternalProps,
        Partial<ThemeProviderDefaultProps> {}

interface ThemeProviderState extends ThemeContextProps {}

export class ThemeProvider extends React.Component<
    PropsWithChildren<ThemeProviderExternalProps & ThemeProviderDefaultProps>,
    ThemeProviderState
> {
    state: ThemeProviderState = {
        theme: this.props.defaultTheme,
        onThemeSwitch: this.setTheme.bind(this),
    };

    setTheme(theme: Theme) {
        this.setState({
            theme,
        });
        if (this.props.onThemeSwitch) {
            this.props.onThemeSwitch(theme);
        }
    }

    componentDidMount() {
        this.updateBodyClassName(this.state.theme);
    }

    componentDidUpdate(_prevProps: ThemeProviderProps, prevState: ThemeProviderState) {
        if (prevState.theme !== this.state.theme) {
            this.updateBodyClassName(this.state.theme);
        }
    }

    render() {
        return (
            <ThemeContext.Provider value={this.state}>{this.props.children}</ThemeContext.Provider>
        );
    }

    private updateBodyClassName(theme: string) {
        const bodyEl = document.body;

        if (!bodyEl.classList.contains('yc-root')) {
            bodyEl.classList.add('yc-root');
        }

        bodyEl.classList.toggle('yc-root_theme_light', theme === 'light');
        bodyEl.classList.toggle('yc-root_theme_dark', theme === 'dark');
    }
}
