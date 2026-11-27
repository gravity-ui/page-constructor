import {Provider} from '@gravity-ui/uikit';

import {useTheme} from '../../../context/theme';
import BackLink from '../../BackLink/BackLink';
import Button from '../Button';

export const LegacyContrast = () => {
    const theme = useTheme();
    return (
        <Provider theme={theme} scoped>
            <div style={{background: 'rgb(58, 116, 255)', padding: 20, width: 600}}>
                {(['normal-contrast', 'outlined-contrast', 'flat-contrast'] as const).map(
                    (view) => (
                        <div key={view}>
                            <p>{view}</p>
                            {[false, true].map((link) =>
                                [false, true].map((disabled) => (
                                    <Button
                                        key={`${link}-${disabled}`}
                                        text={`${link ? 'Link' : 'Button'} ${disabled ? 'disabled' : 'enabled'}`}
                                        url={link ? '#next' : undefined}
                                        theme={view}
                                        extraProps={{disabled}}
                                        qa={`${view}-${link ? 'link' : 'button'}-${disabled ? 'disabled' : 'enabled'}`}
                                    />
                                )),
                            )}
                        </div>
                    ),
                )}
                <p>BackLink special</p>
                {[false, true].map((disabled) => (
                    <BackLink
                        key={String(disabled)}
                        title={`Back ${disabled ? 'disabled' : 'enabled'}`}
                        url="#previous"
                        theme="special"
                        extraProps={{disabled}}
                    />
                ))}
            </div>
        </Provider>
    );
};
