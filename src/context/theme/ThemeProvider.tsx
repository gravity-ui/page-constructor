import React, {PropsWithChildren} from 'react';

import {DEFAULT_THEME} from '../../components/constants';
import {ThemeContext, ThemeContextProps} from './ThemeContext';
import {ConstructorTheme, ThemeValueContext} from './ThemeValueContext';

interface ThemeProviderExternalProps {}

interface ThemeProviderDefaultProps {
    theme: ConstructorTheme;
}

export interface ThemeProviderProps
    extends ThemeProviderExternalProps,
        Partial<ThemeProviderDefaultProps> {}

interface ThemeProviderState extends ThemeContextProps {
    themeValue: ConstructorTheme;
}

export class ThemeProvider extends React.Component<
    PropsWithChildren<ThemeProviderExternalProps & ThemeProviderDefaultProps>,
    ThemeProviderState
> {
    static defaultProps: ThemeProviderDefaultProps = {
        theme: DEFAULT_THEME,
    };

    state: ThemeProviderState = {
        theme: this.props.theme,
        themeValue: this.props.theme,
        setTheme: (theme: ConstructorTheme) => {
            this.setState({theme});
        },
    };

    componentDidMount() {
        this.updateBodyClassName(this.state.themeValue);
    }

    componentDidUpdate(prevProps: ThemeProviderProps, prevState: ThemeProviderState) {
        if (prevState.theme !== this.state.theme) {
            this.setState({themeValue: this.state.theme});
            this.updateBodyClassName(this.state.theme);
        }

        if (prevProps.theme !== this.props.theme) {
            this.setState({themeValue: this.state.theme});
            this.updateBodyClassName(this.state.theme);
        }
    }

    render() {
        return (
            <ThemeContext.Provider value={this.state}>
                <ThemeValueContext.Provider value={{themeValue: this.state.themeValue}}>
                    {this.props.children}
                </ThemeValueContext.Provider>
            </ThemeContext.Provider>
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
