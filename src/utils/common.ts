export interface ScriptOptions {
    id: string;
    defer?: boolean;
    async?: boolean;
}

export async function loadScript(src: string, {id, defer = false, async = true}: ScriptOptions) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.defer = defer;
        script.async = async;
        script.onload = (event) => {
            resolve(event);
        };
        script.onerror = (event) => {
            const element = document.getElementById(id);
            element?.parentNode?.removeChild(element);
            reject(event);
        };
        document.head.appendChild(script);
    });
}
