import * as React from 'react';
import {Text} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';

import './FormOutput.scss';

const b = block('form-output');

interface FormOutputProps {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    className?: string;
}

export const FormOutput: React.FC<FormOutputProps> = ({title, data, className}) => {
    return (
        <div className={b(null, className)}>
            <Text variant="header-2" style={{marginTop: '20px', marginBottom: '10px'}}>
                {title}
            </Text>
            <pre className={b('content')}>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};
