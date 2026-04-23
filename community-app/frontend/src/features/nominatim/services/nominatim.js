import { ServiceError } from "./errors.js";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";

export async function searchCoords(location, { signal, limit = 5 } = {}) {

    if (!location || location.trim() === ''){
        throw new ServiceError ('Invalid Input', 'Search query cannot be found');
    }

    try {   
        const url = `${NOMINATIM_BASE_URL}/search?${location}&addressdetails=1&limit=${limit}`; 
        
        const response = await fetch(url, {
            signal
        });

        if (!response.ok)
        {
            if (response.status === 429 ) throw new ServiceError('RateLimit', 'Too many requests to Nominatim service, please wait a moment', { status: 429});
            if (response.status >= 500 ) throw new ServiceError('Server', 'The Nominatim service is unavailable, try again later', { status: response.status })
            throw new ServiceError('Server', `Unexpected error: ${response.status}`, { status: response.status });
        }

        return await response.json();
 
    } catch (error) {

        if (error.name === 'AbortError') throw new ServiceError ('Abort', 'Request Cancelled', { cause: error});
        if (error instanceof TypeError ) 
        {
            throw new ServiceError ('Network', 'Offline? Check your connection', { cause: error});
        }

        throw new ServiceError ('Unknown', error.message || "unexpected", { cause: error});
    }
}