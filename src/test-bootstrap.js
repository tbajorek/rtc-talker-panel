const jsdom = require('jsdom').JSDOM;

const document = new jsdom('<!doctype html><html><body></body></html>');
document.getElementsByTagName = (a) => [];
global.document = document.window.document;
global.window = document.window;
global.screen = {
    width: 1920,
    height: 1080,
};
global.navigator = {
    userAgent: 'node.js',
    platform: 'windows', // This can be set to mac, windows, or linux
    appName: 'Microsoft Internet Explorer', // Be sure to define this as well,
    mediaDevices: {
        getSupportedConstraints: () => ({
            autoGainControl: true,
            browserWindow: true,
            channelCount: true,
            deviceId: true,
            echoCancellation: true,
            facingMode: true,
            frameRate: true,
            height: true,
            mediaSource: true,
            noiseSuppression: true,
            scrollWithPage: true,
            viewportHeight: true,
            viewportOffsetX: true,
            viewportOffsetY: true,
            viewportWidth: true,
            width: true,
        }),
    },
};