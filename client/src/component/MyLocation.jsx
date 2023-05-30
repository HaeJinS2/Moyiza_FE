import React, { useEffect, useMemo, useState } from 'react'
import useCurrentLocation from '../hooks/useCurrentLocation';

function MyLocation() {


    const [userLocation, setUserLocation] = useState({});

    const geolocationOptions = useMemo(() => ({
        enableHighAccuracy: true,
        timeout: 1000 * 60 * 1, // 1 min
        maximumAge: 1000 * 3600 * 24, // 24 hour
    }), []);

    const { location: currentLocation, error: currentError } = useCurrentLocation(geolocationOptions);

    // useEffect(() => {
    //     if (currentLocation || currentError) {
    //         console.log('MyLocation component rendered', currentLocation, currentError);
    //         setUserLocation(currentLocation)
    //     }
    // }, [currentLocation, currentError]);

    const latLongBtn = () => {
        if (currentLocation || currentError) {
            console.log('myLocation', currentLocation, currentError);
            setUserLocation(currentLocation)
        }
    }

        console.log(userLocation)
    return (
        <div>
            <button onClick={latLongBtn}>내위치</button>
            <div>
                {currentLocation?.latitude}
                {currentLocation?.longitude}
            </div>
        </div>
    )
}

export default MyLocation