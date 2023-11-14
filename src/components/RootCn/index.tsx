import React, {PropsWithChildren} from 'react';

import {useTheme} from '../../context/theme';
import {ClassNameProps} from '../../models';
import {rootCn} from '../../utils';

const RootCn = ({className, children}: PropsWithChildren<ClassNameProps>) => {
    const theme = useTheme();

    return <div className={rootCn({theme}, className)}>{children}</div>;
};

export default RootCn;
