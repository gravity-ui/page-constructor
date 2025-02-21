import * as React from 'react';

import {TextInput} from '@gravity-ui/uikit';

import {Button} from '../..';
import {useMapApiKey} from '../../../context/mapsContext/useMap';

import './ApiKeyInput.scss';

interface ApiKeyInputProps {
    id: string;
}

const inputID = 'apikey-input';

export const ApiKeyInput = (props: ApiKeyInputProps) => {
    const {id} = props;
    const [apiKey, setApiKey] = React.useState<string>(localStorage?.getItem(id) || '');
    const [_key, setKey] = useMapApiKey();

    const onChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setApiKey(event.target.value);
        },
        [setApiKey],
    );

    const onButtonClick = React.useCallback(() => {
        localStorage.setItem(id, apiKey);

        setKey?.(apiKey);
    }, [id, apiKey, setKey]);

    return (
        <div>
            <label style={{display: 'block'}} htmlFor={inputID}>
                Api key for google maps
            </label>
            <div style={{display: 'flex'}}>
                <TextInput
                    id={inputID}
                    type="text"
                    className="apikey-input"
                    value={apiKey}
                    onChange={onChange}
                />
                <Button
                    className="apikey-button"
                    theme="action"
                    size="s"
                    text="Apply"
                    onClick={onButtonClick}
                />
            </div>
        </div>
    );
};

export default ApiKeyInput;
