import TestEditorBlock from './TestEditorBlock';
import testEditorBlockInputs from './form';

const TestEditorBlockConfig = {
    type: 'custom/test-editor-block',
    component: TestEditorBlock,
    schema: {
        name: 'Test Editor Block',
        group: 'custom',
        inputs: testEditorBlockInputs,
    },
};

export const TestEditorBlockSchema = {
    ['test-editor-block']: {},
};

export default TestEditorBlockConfig;
