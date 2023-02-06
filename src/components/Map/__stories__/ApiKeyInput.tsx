import React, {useCallback, useState, ChangeEvent} from 'react';

import {TextInput} from '@gravity-ui/uikit';

import {Button} from '../../';
import {useMapApiKey} from '../../../context/mapsContext/useMap';

import './ApiKeyInput.scss';

interface ApiKeyInputProps {
    id: string;
}

export const ApiKeyInput = (props: ApiKeyInputProps) => {
    const {id} = props;
    const [apiKey, setApiKey] = useState<string>(localStorage?.getItem(id) || '');
    const [_key, setKey] = useMapApiKey();

    const onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setApiKey(event.target.value);
        },
        [setApiKey],
    );

    const onButtonClick = useCallback(() => {
        localStorage.setItem(id, apiKey);

        setKey?.(apiKey);
    }, [id, apiKey, setKey]);

    return (
        <div>
            <label style={{display: 'block'}}>Api key for google maps</label>
            <div style={{display: 'flex'}}>
                <TextInput
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
