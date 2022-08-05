let scriptPromise: Promise<unknown>;

const loadHubspotScript = async () => {
    if (scriptPromise) {
        return scriptPromise;
    } else {
        scriptPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '//js-eu1.hsforms.net/forms/v2.js';
            script.onload = (event) => {
                resolve(event);
            };
            script.onerror = (event) => {
                script?.parentNode?.removeChild(script);
                reject(event);
            };

            document.head.appendChild(script);
        });
        return scriptPromise;
    }
};

export default loadHubspotScript;
