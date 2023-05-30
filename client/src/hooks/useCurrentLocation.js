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
        // 사용자의 현재 위치를 가져옴. 성공하면 'handleSuccess' 함수를 호출하고, 실패하면 'handleError' 함수를 호출.
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