export enum AvailableForCompressExtension {
    PNG = 'png',
    JPG = 'jpg',
    JPEG = 'jpeg',
}

export const isCompressible = (fileName: string) =>
    Object.keys(AvailableForCompressExtension).some((ext) => fileName.endsWith(`.${ext}`));
