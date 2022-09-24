![](https://storage.cloud-preprod.yandex.net/cloud-www-assets/wiki/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82%2005-10-2021%20112233.jpg)

`type: "preview-block"`

`title: string`— Menu title

`description?: string` — Menu section description

`direction?: 'media-content' | 'content-media'` — Relative position of media and content. Default: 'content-media'.

`ratioMediaContent?: '2-1' | '1-1'` — Media to content ratio. Default: '1-1'. First number is media, second one - content.

`items: PreviewItemProps[]` — An array of preview items.

- `type: PreviewItemType` — Media type. 'video' | 'image'
- `media:` — Image/video.
  - `video: MediaVideoProps` BE SURE to set `type: player` for video. Structure:
  ```
  export interface MediaVideoProps {
      src: string[];
      type?: MediaVideoTypes;
      loop?: boolean;
      controls?: boolean;
      muted?: boolean;
      autoplay?: boolean;
      elapsedTime?: number; // Time, in seconds, that shows the second to start playing a video from. Default: 0
      playButton?: PlayButtonProps;
  }
  ```
- `content: PreviewContentItemProps` - media description
  - `title: string` — Media name
  - `description?: string`— Media description

### Example:

```yaml
- type: 'preview-block'
    title: 'Training materials'
    direction: 'content-media'
    ratioMediaContent: '2-1'
    items:
    - type: 'video'
      media:
        video:
          type: player # JUST COPY
          src:
            - 'https://storage.cloud-preprod.yandex.net/cloud-www-assets/constructor/main/main-calcx2.mp4'
            - 'https://storage.cloud-preprod.yandex.net/cloud-www-assets/constructor/main/main-calcx2.webm'
          controls: 'custom' # CUSTOM CONTROLS (MUTE). Default: 'default'
          loop: true
        previewImg: 'https://storage.yandexcloud.net/cloud-www-assets/solutions/e-commerce/retail-video.png'
      content:
        title: 'Title 1'
        description: 'Some description 1'
    - type: 'image'
      media:
        image: 'https://storage.cloud-preprod.yandex.net/cloud-www-assets/test/Alan_Turing_Aged_16.jpg'
      content:
        title: 'Title 2'
        description: 'Some description 2'
```
