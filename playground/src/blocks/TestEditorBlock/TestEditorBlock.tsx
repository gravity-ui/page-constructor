import * as React from 'react';

export interface TestEditorBlockProps extends React.PropsWithChildren {}

export const TestEditorBlock = (props: TestEditorBlockProps) => {
    return <div>{JSON.stringify(props, null, 2)}</div>;
};

export default TestEditorBlock;
