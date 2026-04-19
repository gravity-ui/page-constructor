import * as React from 'react';

import {BlockIdContext} from '../context/blockIdContext';

import usePCEditorBlockMouseEvents from './usePCEditorBlockMouseEvents';
import usePCEditorBlockSelection from './usePCEditorBlockSelection';
import {usePCEditorStore} from './usePCEditorStore';

export function usePCEditorChildrensWrap() {
    const {manipulateOverlayMode} = usePCEditorStore();

    return {};
}
