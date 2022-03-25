import {DataLensObjectProps, DataLensProps} from '../../../models';

export function unifyDataLensToObject(dataLens: DataLensProps): DataLensObjectProps {
    return typeof dataLens === 'string' ? {id: dataLens, theme: 'light'} : dataLens;
}
