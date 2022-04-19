![](https://storage.cloud-preprod.yandex.net/cloud-www-assets/wiki/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82%2005-10-2021%20112233.jpg)

`type: "preview-block"`

`title: string` - заголовок меню

`description?: string` - описание в секции меню

`direction?: 'media-content' | 'content-media'` - относительное расположение медиа и контента. Default: 'content-media'.

`ratioMediaContent?: '2-1' | '1-1'` - соотношение media и content. Default: '1-1'. First number is media, second one - content.

`items: PreviewItemProps[]` - массив preview items

- `type: PreviewItemType` - media type. 'video' | 'image'
- `media:` - изображение/видео
  - `video: MediaVideoProps` ВАЖНО указать `type: player` для video. Структура:
  ```
  export interface MediaVideoProps {
      src: string[];
      type?: MediaVideoTypes;
      loop?: boolean;
      controls?: boolean;
      muted?: boolean;
      autoplay?: boolean;
      elapsedTime?: number; // Это время в секундах, с какой секунды мы хотим воспроизвести видео. Default: 0
      playButton?: PlayButtonProps;
  }
  ```
- `content: PreviewContentItemProps` - media description
  - `title: string` - название media
  - `description?: string` - описание media

### Example:

```yaml
- type: 'preview-block'
    title: 'Обучающие материалы'
    direction: 'content-media'
    ratioMediaContent: '2-1'
    items:
    - type: 'video'
      media:
        video:
          type: player # ТУПО КОПИРУЕМ
          src:
            - 'https://storage.cloud-preprod.yandex.net/cloud-www-assets/constructor/main/main-calcx2.mp4'
            - 'https://storage.cloud-preprod.yandex.net/cloud-www-assets/constructor/main/main-calcx2.webm'
          controls: 'custom' # КАСТОМНЫЕ КОНТРОЛЫ (MUTE). Default: 'default'
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
