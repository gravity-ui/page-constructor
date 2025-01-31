import * as React from 'react';

import FullscreenMedia from '../../FullscreenMedia/FullscreenMedia';
import Video, {VideoAllProps} from '../Video/Video';

const FullscreenVideo: React.FC<VideoAllProps> = (props) => {
    return (
        <FullscreenMedia>{(classNames) => <Video {...props} {...classNames} />}</FullscreenMedia>
    );
};

export default FullscreenVideo;
