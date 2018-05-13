export const buildAction = (type, payload) => ({ type, payload });

export const isLocalhost = () => document.location.href.startsWith('http://localhost');
