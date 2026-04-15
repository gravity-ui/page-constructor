import * as React from 'react';

import {MediaAllProps} from '../components/Media/Media';
import {useWindowWidth} from '../context/windowWidthContext';

export const useImageSize = ({
    onIntrinsicSizeChange,
    onLoad: onLoadProps,
}: Pick<MediaAllProps, 'onIntrinsicSizeChange'> & {
    onLoad?: React.ReactEventHandler<HTMLImageElement>;
}) => {
    const windowWidth = useWindowWidth();

    const imageRef = React.useRef<HTMLImageElement>(null);

    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageSize, setImageSize] = React.useState<{width: number; height: number} | undefined>(
        undefined,
    );

    const onImageSizeChange = React.useMemo(
        () =>
            onIntrinsicSizeChange
                ? (image: HTMLImageElement | null) => {
                      if (image) {
                          setImageSize((prev) => {
                              if (
                                  prev?.width === image.naturalWidth &&
                                  prev?.height === image.naturalHeight
                              ) {
                                  return prev;
                              }

                              return {width: image.naturalWidth, height: image.naturalHeight};
                          });
                      }
                  }
                : undefined,
        [onIntrinsicSizeChange],
    );

    const onLoad = React.useCallback<React.ReactEventHandler<HTMLImageElement>>(
        (e) => {
            setImageLoaded(true);
            onImageSizeChange?.(imageRef.current);
            onLoadProps?.(e);
        },
        [onImageSizeChange, onLoadProps],
    );

    // to receive size even if the image has been loaded before hydration
    React.useEffect(() => {
        setImageLoaded(Boolean(imageRef.current?.complete));
    }, []);

    React.useEffect(() => {
        if (imageLoaded) {
            onImageSizeChange?.(imageRef.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth, imageLoaded]);

    React.useEffect(() => {
        if (imageSize) {
            onIntrinsicSizeChange?.(imageSize);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageSize]);

    return {
        imageRef,
        onLoad,
    };
};
