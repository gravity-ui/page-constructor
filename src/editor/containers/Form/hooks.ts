import {useEffect, useState} from 'react';

import yaml from 'js-yaml';

import usePreviousValue from '../../hooks/usePreviousValue';
import {FormTab} from '../../types';

import {FormProps} from './Form';

/**
 * Transorms PageConstructor content in JSON to YAML on code editor mode switching
 *
 * @param {Object} props - props parent from form
 * @returns {string} - updated code
 */
export function useCode({
    activeTab,
    content,
    codeFullscreeModeOn,
}: Pick<FormProps, 'activeTab' | 'content' | 'codeFullscreeModeOn'>) {
    const [code, setCode] = useState('');

    const prevTab = usePreviousValue(activeTab);
    const prevContentLength = usePreviousValue(content.blocks?.length);
    const prevCodeFullscreeModeOn = usePreviousValue(codeFullscreeModeOn);

    useEffect(() => {
        const switchedToCodeEditing = activeTab !== prevTab && activeTab === FormTab.Code;
        const blocksCountChanged = prevContentLength !== content.blocks?.length;
        const codeModeSwitched = codeFullscreeModeOn !== prevCodeFullscreeModeOn;

        if (blocksCountChanged || switchedToCodeEditing || codeModeSwitched) {
            setCode(yaml.dump(content, {lineWidth: -1}));
        }
    }, [
        activeTab,
        prevTab,
        content,
        prevContentLength,
        codeFullscreeModeOn,
        prevCodeFullscreeModeOn,
    ]);

    return code;
}
