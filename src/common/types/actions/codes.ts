export enum ActionTypes {
    // Other Events
    UpdateConfigs = 'UPDATE_CONFIGS',
    SetHeight = 'SET_HEIGHT',

    // Initial Events
    IframeReady = 'IFRAME_READY',
    EditorReady = 'EDITOR_READY',
    BlocksConfigs = 'BLOCKS_CONFIGS',

    // Insert Events
    InsertBlock = 'INSERT_BLOCK',
    InsertModeEnable = 'INSERT_MODE_ENABLE',
    InsertModeDisable = 'INSERT_MODE_DISABLE',

    // Reorder Events
    ReorderBlocks = 'REORDER_BLOCKS',
    ReorderModeEnable = 'REORDER_MODE_ENABLE',
    ReorderModeDisable = 'REORDER_MODE_DISABLE',

    // Overlay Mode
    OverlayModeOnMove = 'OVERLAY_MODE_ON_MOVE',

    // Select Events
    SelectBlock = 'SELECT_BLOCK',
    UpdateSelectedBlockRect = 'UPDATE_SELECTED_BLOCK_RECT',
}
