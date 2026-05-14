// `@iframe-resizer/child` reads `window.iFrameResizer` lazily, on the first
// init message from the parent — not at module-load time. So setting the
// config before/after the side-effect import is equivalent.
// eslint-disable-next-line import/no-unassigned-import
import '@iframe-resizer/child';

// Augmenting the library's namespace to add the missing `license` field; the
// shipped .d.ts has not caught up with the v5 runtime that requires it.
declare module '@iframe-resizer/child' {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace iframeResizer {
        interface IFramePageOptions {
            license?: string;
        }
    }
}

if (typeof window !== 'undefined') {
    window.iFrameResizer = {license: 'GPLv3'};
}
