import React, {useState} from 'react';

import {Copy, CopyCheck} from '@gravity-ui/icons';
import {Button, Icon, Tooltip} from '@gravity-ui/uikit';

let uncheckTimer: NodeJS.Timer | null = null;
const UNCHECK_TIMEOUT = 2000; // ms

interface CopyButtonProps {
    className?: string;
    value: string;
}

export const CopyButton = ({value, className}: CopyButtonProps) => {
    const [isChecked, setIsChecked] = useState(false);

    const onCopyClick = () => {
        if (isChecked) {
            return;
        }
        navigator.clipboard.writeText(value);

        setIsChecked(true);

        if (uncheckTimer) {
            clearTimeout(uncheckTimer);
        }

        uncheckTimer = setTimeout(() => {
            setIsChecked(false);
            uncheckTimer = null;
        }, UNCHECK_TIMEOUT);
    };

    return (
        <Tooltip content={'Copy'} disabled={isChecked}>
            <Button size="m" view="raised" onClick={onCopyClick} className={className}>
                <Icon data={isChecked ? CopyCheck : Copy} />
            </Button>
        </Tooltip>
    );
};
