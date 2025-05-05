import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import {DEFAULT_BODY_CLASSNAME} from '../constants';
import '../styles/globals.scss';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={DEFAULT_BODY_CLASSNAME}>{children}</body>
        </html>
    );
}
