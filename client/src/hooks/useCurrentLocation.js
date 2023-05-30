import { useState } from "react";

export const useCurrentLocation = (options = {}) => {
    const [location, setLocation] = useState();
    const [error, setError] = useState();

    const getLocation = () => {
        const { geolocation } = navigator;
        if (!geolocation) {
            setError("Geolocation is not supported.");
            return;
        }
        geolocation.getCurrentPosition(handleSuccess, handleError, options);
    };

    const handleSuccess = (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({
            latitude,
            longitude,
        });
    };

    const handleError = (error) => {
        setError(error.message);
    };

    return { getLocation, location, error };
};

export default useCurrentLocation;