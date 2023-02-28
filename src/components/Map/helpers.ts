export function getMapHeight(width: number, isMobile: boolean): number {
    return isMobile ? (width / 4) * 3 : (width / 16) * 9;
}
