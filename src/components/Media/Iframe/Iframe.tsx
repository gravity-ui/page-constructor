import {MediaComponentIframeProps} from '../../../models';
import {block} from '../../../utils';

import {i18n} from './i18n';

import './Iframe.scss';

const b = block('media-component-iframe');

const Iframe = (props: MediaComponentIframeProps) => {
    const {iframe, margins = true} = props;
    const {height = 400, src, width, name, title} = iframe;

    return iframe ? (
        <div className={b({margins})} style={{height}}>
            <iframe
                className={b('item')}
                loading="lazy"
                title={title || i18n('iframe-title')}
                frameBorder={0}
                src={src}
                width={width}
                height={height}
                name={name}
            />
        </div>
    ) : null;
};

export default Iframe;
