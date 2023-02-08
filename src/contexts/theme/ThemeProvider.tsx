import React from 'react';

import {ThemeContext, ThemeContextProps} from './ThemeContext';
import {ThemeValueType, ThemeValueContext} from './ThemeValueContext';
import {DEFAULT_THEME} from '../../constants';

interface ThemeProviderExternalProps {}

interface ThemeProviderDefaultProps {
    theme: ThemeValueType;
    children?: React.ReactNode;
}

export interface ThemeProviderProps
    extends ThemeProviderExternalProps,
        Partial<ThemeProviderDefaultProps> {}

interface ThemeProviderState extends ThemeContextProps {
    themeValue: ThemeValueType;
}

export class ThemeProvider extends React.Component<
    ThemeProviderExternalProps & ThemeProviderDefaultProps,
    ThemeProviderState
> {
    static defaultProps: ThemeProviderDefaultProps = {
        theme: DEFAULT_THEME,
    };

    state: ThemeProviderState = {
        theme: this.props.theme,
        themeValue: this.props.theme,
        setTheme: (theme: ThemeValueType) => {
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
