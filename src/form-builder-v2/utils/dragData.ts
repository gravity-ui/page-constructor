import type {Data} from '@dnd-kit/abstract';

import type {BuilderFieldType} from '../types';

export interface PaletteDragData extends Data {
    kind: 'palette';
    type: BuilderFieldType;
}

export interface CardDragData extends Data {
    kind: 'card';
    group: string;
}

export interface SectionDropData extends Data {
    kind: 'section-drop';
    sectionId: string;
}

export function isPaletteData(data: Data | null | undefined): data is PaletteDragData {
    return data !== null && data !== undefined && data.kind === 'palette';
}

export function isCardData(data: Data | null | undefined): data is CardDragData {
    return data !== null && data !== undefined && data.kind === 'card';
}

export function isSectionDropData(data: Data | null | undefined): data is SectionDropData {
    return data !== null && data !== undefined && data.kind === 'section-drop';
}

export const isDropAfter = (
    pointerY: number | undefined,
    targetCenterY: number | undefined,
): boolean => pointerY !== undefined && targetCenterY !== undefined && pointerY > targetCenterY;
