import {useDroppable} from '@dnd-kit/react';
import {Text} from '@gravity-ui/uikit';

import {FormField} from '../../../types';
import {formBuilderV2Cn} from '../../../utils/cn';
import type {SectionDropData} from '../../../utils/dragData';
import {CanvasList} from '../../Canvas/Canvas';

const b = formBuilderV2Cn('canvas-card');

export const SECTION_DROP_PREFIX = 'section-drop:';

export type {SectionDropData};

interface SectionChildrenDropZoneProps {
    sectionId: string;
    fields: FormField[];
}

export const SectionChildrenDropZone = ({sectionId, fields}: SectionChildrenDropZoneProps) => {
    const {ref, isDropTarget} = useDroppable({
        id: `${SECTION_DROP_PREFIX}${sectionId}`,
        data: {kind: 'section-drop', sectionId},
    });

    const className = b('children');

    return (
        <div ref={ref} className={`${className}${isDropTarget ? ` ${className}_drop-target` : ''}`}>
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
