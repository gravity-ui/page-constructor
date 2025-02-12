import * as React from 'react';

import yaml from 'js-yaml';

import {PageContent} from '../../../../models';
import usePreviousValue from '../../../hooks/usePreviousValue';

type UseCodeProps = {
    content: PageContent;
    codeFullscreeModeOn: boolean;
    isCodeEditMode: boolean;
};

/**
 * Transorms PageConstructor content in JSON to YAML on code editor mode switching
 *
 * @param {Object} props - props parent from form
 * @returns {string} - updated code
 */
export function useCode({content, codeFullscreeModeOn, isCodeEditMode}: UseCodeProps) {
    const [code, setCode] = React.useState('');

    const prevContentLength = usePreviousValue(content.blocks?.length);
    const prevCodeFullscreeModeOn = usePreviousValue(codeFullscreeModeOn);

    React.useEffect(() => {
        const blocksCountChanged = prevContentLength !== content.blocks?.length;
        const codeModeSwitched = codeFullscreeModeOn !== prevCodeFullscreeModeOn;

        if (blocksCountChanged || isCodeEditMode || codeModeSwitched) {
            setCode(yaml.dump(content, {lineWidth: -1}));
        }
    }, [isCodeEditMode, content, prevContentLength, codeFullscreeModeOn, prevCodeFullscreeModeOn]);

    return code;
}
