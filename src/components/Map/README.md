Map

`type: "map"`

`center: number[]` - Geo coordinates of the map center, required for `Yandex maps`
`zoom?: number` - Map zoom level. In google maps values ranging from 0 (the whole world) to 21 (individual buildings). In Yandex maps values ranging from 1 (the whole world) to 16 (individual buildings)

`address?: string;` - URL-escaped place name, address. You need to use it for `Google maps`

`id?: string` - map id. You need to use it for `Yandex maps`. As an id, you can specify a short description, for example `offices`, and the full id will be `ymap-offices`

`markers?: object[]` - Description for placemarkers. You need to use it for `Yandex maps`. Specify the parameters given below.

- `address?: string` — Place name, address
- `coordinate?: number[]` - Geo coordinates of the place
- `label?: object` - Special parameters for displaying the placemark

  - `iconCaption?: string` - Caption for the geo object's icon
  - `iconContent?: string` - Content of the geo object's icon
  - `iconColor?: string` - The color of the placemark. There are three ways to set the color: using a keyword, in Hex format, or RGB. A red placemark is used by default.
  - `preset?: string` - Key for the placemark's preset options. A `islands#dotIcon` is used by default. The list of available keys is stored in the [presetStorage](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/option.presetStorage.html) description
