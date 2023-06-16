import React, { useState, useEffect } from 'react';
import useCurrentLocation from '../hooks/useCurrentLocation';

export function MyLocation() {
    const geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 1000 * 60 * 1,
        maximumAge: 1000 * 3600 * 24,
    };

    const { getLocation, location, error } = useCurrentLocation(geolocationOptions);
    const [loading, setLoading] = useState(false);

    const handleButtonClick = () => {
        setLoading(true);
        getLocation();
    };

    useEffect(() => {
        if (location || error) {
            setLoading(false);
        }
    }, [location, error]);

    return (
        <div>
            <button onClick={handleButtonClick}>내위치</button>
            <div>
                {loading ? "Loading..." :
                location ? `${location.latitude}, ${location.longitude}` : ''}
            </div>
        </div>
    )
}

export default MyLocation;