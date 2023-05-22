import React from 'react';

import FullScreenMedia from '../../FullscreenMedia/FullScreenMedia';
import Video, {VideoAllProps} from '../Video/Video';

const FullscreenVideo: React.FC<VideoAllProps> = (props) => {
    return (
        <FullScreenMedia>{(classNames) => <Video {...props} {...classNames} />}</FullScreenMedia>
    );
};

export default FullscreenVideo;
