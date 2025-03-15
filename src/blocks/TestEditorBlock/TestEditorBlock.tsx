import * as React from 'react';

import {block} from '../../utils';

const b = block('test-editor-block');

export interface TestEditorBlockProps extends React.PropsWithChildren {}

export const TestEditorBlock = (props: TestEditorBlockProps) => {
    return <div className={b()}>{JSON.stringify(props, null, 2)}</div>;
};

export default TestEditorBlock;
