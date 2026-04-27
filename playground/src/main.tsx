import * as React from 'react';

import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router';

import Router from './router';

import './styles/globals.scss';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </React.StrictMode>,
);
