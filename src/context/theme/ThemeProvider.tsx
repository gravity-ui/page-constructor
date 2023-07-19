import React, {PropsWithChildren} from 'react';

import {Theme} from '../../models';

import {ThemeContext, ThemeContextProps} from './ThemeContext';

interface ThemeProviderExternalProps {}

interface ThemeProviderDefaultProps {
    theme: Theme;
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
        theme: this.props.theme,
        setTheme: (theme: Theme) => {
            this.setState({theme});
        },
    };

    componentDidMount() {
        this.updateBodyClassName(this.state.theme);
    }

    componentDidUpdate(prevProps: ThemeProviderProps) {
        if (prevProps.theme !== this.props.theme) {
            this.setState({theme: this.props.theme});
            this.updateBodyClassName(this.props.theme);
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
