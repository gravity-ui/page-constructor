export enum AvailableForCompressExtension {
    PNG = 'png',
    JPG = 'jpg',
    JPEG = 'jpeg',
}

export const isCompressible = (fileName: string) =>
    Object.values(AvailableForCompressExtension).some((ext) =>
        fileName.toLowerCase().endsWith(`.${ext}`),
    );
