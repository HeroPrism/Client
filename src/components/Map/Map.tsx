import React, { useState, FC, useContext, createRef } from 'react';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps"
import { AppContext } from '../../App';

export const Map: FC = () => {
    const { state, dispatch } = useContext(AppContext);
    const [ center, setCenter ] = useState({ lat: -34.397, lng: 150.644 });
    const mapRef = createRef<GoogleMap>();

    const onDragEnd = () => {
        //dispatch({ type: 'BoundsChanged', payload: mapRef.current?.getBounds() })
    }
    
    const MyMapComponent = withGoogleMap((props) =>
        <GoogleMap
            ref={mapRef}
            defaultZoom={8}
            defaultCenter={center}
            onDragEnd={onDragEnd}
        >
            <Marker position={{ lat: -34.397, lng: 150.644 }} />
        </GoogleMap>
    )

    return (
        <div style={{ height: "calc(100vh - 75px)", width: "100%" }}>
            <MyMapComponent
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}