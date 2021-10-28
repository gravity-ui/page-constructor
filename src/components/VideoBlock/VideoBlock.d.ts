export interface VideoBlockProps {
    id?: string;
    stream?: string;
    record?: string;
    attributes?: Record<string, string>;
    className?: string;
    previewImg?: string;
    playButton?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function VideoBlock(props: VideoBlockProps): JSX.Element {}
