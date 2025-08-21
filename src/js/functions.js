// Utility functions, no DOMContentLoaded needed
const isDevelopment = process.env.NODE_ENV === 'development';
const baseUrl = isDevelopment ? 'http://localhost:3000' : '/api'; // Centralized base URL logic

/**
 * Returns the full URL for the given endpoint.
 * @param {string} endpoint - API endpoint.
 * @returns {string} Full API URL.
 */
export function getApiUrl(endpoint) {
    return `${baseUrl}/${endpoint}`;
}

/**
 * Universal function to fetch JSON data from a given endpoint.
 * @param {string} endpoint - API endpoint
 * @returns {Promise<any>} JSON response
 */
export async function fetchJson(endpoint) {
    const url = getApiUrl(endpoint); // Build full URL
    const response = await fetch(url); // Perform fetch request

    if (!response.ok) {
        throw new Error(`Failed to fetch from ${endpoint}: ${response.statusText}`);
    }

    return response.json(); // Parse response as JSON
}
