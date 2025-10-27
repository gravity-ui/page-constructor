declare module 'icons/*.svg' {
    const content: SVGIconData;

    export default content;
}

declare module '*.svg' {
    const path: string;

    export default path;
}

declare module '*.md';

declare namespace Hbspt {
    interface CreateFormProps {
        portalId: string;
        formId: string;
        region?: string;
        target?: string;
        cssClass?: string;
        formInstanceId?: string;
        onFormReady?: (form: HTMLFormElement) => void;
    }
}

declare namespace Ymaps {
    export function ready(): Promise;

    class Promise {
        then(onFulfilled?: Function, onRejected?: Function, onProgress?: Function): Promise;
    }

    export class Map {
        setCenter: (center: number[]) => void;
        setZoom: (zoom: number) => void;
        geoObjects: {
            add: (object) => void;
            removeAll: () => void;
            get: () => void;
        };
        constructor(element: string, state: MapState);
        destroy(): Promise;
    }

    export class GeoObject {
        properties: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set: (objectName: string, value: any) => void;
        };
        options: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set: (objectName: string, value: any) => void;
        };
    }

    export class MapState {
        center: number[];
        controls: string[];
        zoom: number;
    }
}

interface Window {
    hbspt?: {
        forms: {
            create: (args: Hbspt.CreateFormProps) => unknown;
        };
    };
    ymaps: Ymaps;
}
