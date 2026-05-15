import * as React from 'react';

import {IconButton} from '@storybook/components';
import {EditIcon} from '@storybook/icons';
import {addons, types, useGlobals} from '@storybook/manager-api';
const STORY_PREPARED = 'storyPrepared';
const STORY_CHANGED = 'storyChanged';

import {ADDON_ID, GLOBAL_KEY, TOOL_ID} from './constants';

addons.register(ADDON_ID, () => {
    addons.add(TOOL_ID, {
        type: types.TOOL,
        title: 'Form editor',
        render: () => <FormTool />,
    });
});

function FormTool() {
    const [globals, updateGlobals] = useGlobals();
    const isActive = Boolean(globals[GLOBAL_KEY]);
    const [hasInputs, setHasInputs] = React.useState(false);

    React.useEffect(() => {
        const channel = addons.getChannel();

        const onPrepared = ({parameters}: {parameters: Record<string, unknown>}) => {
            setHasInputs(Boolean(parameters?.inputs));
        };

        const onChanged = () => setHasInputs(false);

        channel.on(STORY_PREPARED, onPrepared);
        channel.on(STORY_CHANGED, onChanged);

        return () => {
            channel.off(STORY_PREPARED, onPrepared);
            channel.off(STORY_CHANGED, onChanged);
        };
    }, []);

    if (!hasInputs) {
        return null;
    }

    return (
        <IconButton
            active={isActive}
            title="Toggle form editor"
            onClick={() => updateGlobals({[GLOBAL_KEY]: !isActive})}
        >
            <EditIcon />
        </IconButton>
    );
}
