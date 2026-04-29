import * as React from 'react';

import {useDroppable} from '@dnd-kit/react';
import {Text} from '@gravity-ui/uikit';

import {FormField} from '../../../types';
import {formBuilderV2Cn} from '../../../utils/cn';
import {asReactRef} from '../../../utils/dndRef';
import {CanvasList} from '../../Canvas/Canvas';

const b = formBuilderV2Cn('canvas-card');

export const SECTION_DROP_PREFIX = 'section-drop:';

export interface SectionDropData {
    kind: 'section-drop';
    sectionId: string;
}

interface SectionChildrenDropZoneProps {
    sectionId: string;
    fields: FormField[];
}

export const SectionChildrenDropZone: React.FC<SectionChildrenDropZoneProps> = ({
    sectionId,
    fields,
}) => {
    const {ref, isDropTarget} = useDroppable({
        id: `${SECTION_DROP_PREFIX}${sectionId}`,
        data: {kind: 'section-drop', sectionId} as SectionDropData,
    });

    const className = b('children');

    return (
        <div
            ref={asReactRef<HTMLDivElement>(ref)}
            className={`${className}${isDropTarget ? ` ${className}_drop-target` : ''}`}
        >
            <CanvasList fields={fields} parentGroup={`section:${sectionId}`} />
            {fields.length === 0 && (
                <Text variant="body-2" color="hint">
                    Empty section. Drag a tile from the palette into this box, or select the section
                    first and click a tile to add it inside.
                </Text>
            )}
        </div>
    );
};
