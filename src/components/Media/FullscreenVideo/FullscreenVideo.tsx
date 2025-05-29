import FullscreenMedia from '../../FullscreenMedia/FullscreenMedia';
import Video, {VideoAllProps} from '../Video/Video';

const FullscreenVideo = (props: VideoAllProps) => {
    return (
        <FullscreenMedia>{(classNames) => <Video {...props} {...classNames} />}</FullscreenMedia>
    );
};

export default FullscreenVideo;
