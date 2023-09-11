import { Config } from '@stencil/core';

export const config: Config = {
    namespace: 'intervention-request',
    taskQueue: 'async',
    extras: {
        enableImportInjection: true,
    },
    devServer: {
        logRequests: true
    },
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: '../loader'
        },
        { type: 'docs-readme' },
        {
            type: 'www',
            serviceWorker: null
        }
    ]
};
