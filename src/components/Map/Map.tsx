import React, { useState, FC, useContext, createRef, useEffect } from 'react';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps"
import  debounce from 'lodash.debounce';
import { AppContext } from '../../App';
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';



const MyMapComponent = withGoogleMap((props : any) =>
    <GoogleMap
        ref={props.mapRef}
        defaultZoom={10}
        defaultCenter={props.center}
        onDragEnd={props.onDragEnd}
        onBoundsChanged={props.onBoundsChanged}
    >
        <>
            {
                props.tasks && props.tasks.map((task: TasksResponse) => <Marker position={{ lat: task.coordinates.lat, lng: task.coordinates.lng }} />)
            }
        </>
        
    </GoogleMap>
);

export const Map: FC = () => {
    const app = useContext(AppContext);
    const { tasks } = app.state;
    const [ center, setCenter ] = useState({
        lat: 33.425522,
        lng: -111.941254
    });
    const mapRef = createRef<GoogleMap>();

    const onBoundsChanged = debounce(() => {
        app.dispatch({ type: 'SetBounds', payload: mapRef.current?.getBounds() })
    }, 250);

    return (
        <div style={{ height: "calc(100vh - 75px)", width: "100%" }}>
            <MyMapComponent
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                center={center}
                tasks={app.state.tasks}
                mapRef={mapRef}
                onBoundsChanged={onBoundsChanged}
            />
        </div>
    );
}