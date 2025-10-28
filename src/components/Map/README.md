Map

`type: "map"`

`zoom?: number` - Map zoom level. In google maps values ranging from 0 (the whole world) to 21 (individual buildings). In Yandex maps values ranging from 1 (the whole world) to 16 (individual buildings)

`address?: string;` - URL-escaped place name, address. You need to use it for `Google maps`

`forceAspectRatio?: boolean` - Determines whether map's aspect ratio is forced autmatically (16:9 for Desktop, 4:3 for Mobile), `true` by default

`id?: string` - map id. You need to use it for `Yandex maps`. As an id, you can specify a short description, for example `offices`, and the full id will be `ymap-offices`

`disableControls?: boolean` - If `true`, hides map's default controls. Only for `Yandex maps`. `false` by default

`disableBalloons?: boolean` - If `true`, disables info ballon opening when clicking on a marker. Only for `Yandex maps`. `false` by default

`areaMargin?: number | [number, number] | [number, number, number]` - Offset (in pixels) for the marked area of the map relative to the map's container. Only for `Yandex maps`. `30` by default

`markers?: object[]` - Description for placemarkers. You need to use it for `Yandex maps`. Specify the parameters given below.

- `address?: string` — Place name, address
- `coordinate?: number[]` - Geo coordinates of the place
- `label?: object` - Special parameters for displaying the placemark

  - `iconCaption?: string` - Caption for the geo object's icon
  - `iconContent?: string` - Content of the geo object's icon
  - `iconColor?: string` - The color of the placemark. There are three ways to set the color: using a keyword, in Hex format, or RGB. A red placemark is used by default.
  - `iconImageHref?: string` - URL of geo object's custom icon image file
  - `iconImageSize?: [number, number]` - Dimensions of custom icon image
  - `iconImageOffset?: [number, number]` - Custom icon image's offset relative to it's anchor point
  - `iconImageClipRect?: [[number, number], [number, number]]` - Coordinates of custom icon image's displayed rectangular area, in pixels
  - `iconLayout?: 'default#image'` - Required to use custom icons for a geo object
  - `iconShape?: Record<string, any>` - Icon's active area shape. Refer to documentation [e.g. Circle](https://yandex.ru/dev/jsapi-v2-1/doc/ru/v2-1/ref/reference/shape.Circle)
  - `preset?: string` - Key for the placemark's preset options. A `islands#dotIcon` is used by default. The list of available keys is stored in the [presetStorage](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/option.presetStorage.html) description
