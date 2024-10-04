import TestEditorBlock from './TestEditorBlock';
import testEditorBlockInputs from './form';

const TestEditorBlockConfig = {
    component: TestEditorBlock,
    schema: {
        name: 'Test Editor Block',
        inputs: testEditorBlockInputs,
    },
};

export const TestEditorBlockSchema = {
    ['test-editor-block']: {},
};

export default TestEditorBlockConfig;
