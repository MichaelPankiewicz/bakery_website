// Utility functions, no DOMContentLoaded needed
export function getApiUrl(endpoint) {
    const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : '';
    return process.env.NODE_ENV === 'development'
        ? `${baseUrl}/${endpoint}`
        : `${baseUrl}/api/${endpoint}`;
}

export async function fetchJson(endpoint) {
    const url = getApiUrl(endpoint);
    const res = await fetch(url);
    return res.json();
}
