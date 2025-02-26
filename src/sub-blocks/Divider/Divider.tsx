import {DividerProps} from '../../models';
import {block} from '../../utils';

import './Divider.scss';

const b = block('divider-block');

const Divider = ({size = 'm', border}: DividerProps) => <div className={b({size, border})} />;

export default Divider;
