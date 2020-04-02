import React, { useState, FC, useContext, createRef, useEffect, ComponentClass, Children } from 'react';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps"
import  debounce from 'lodash.debounce';
import { AppContext } from '../../App';
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';
import { ResponsiveContext, Box } from 'grommet';
import { MapMarker } from './MapMarker';

const mapStyles: any = [
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#f8f8f8"
        }
      ]
    },
    {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#e6f4f1"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#fffefd"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#fda68c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#d9f3fc"
        }
      ]
    }
];

const MyMapComponent = withGoogleMap((props : any) =>
    <GoogleMap
        ref={props.mapRef}
        defaultZoom={10}
        defaultCenter={props.center}
        onBoundsChanged={props.onBoundsChanged}
        defaultOptions={{ 
            styles: mapStyles, 
            disableDefaultUI: true,
            zoomControl: true
        }}
    >
        {props.tasks?.map((task: TasksResponse) => (
            <Marker
                onClick={(e) => console.log('test')}
                key={task.id}
                position={{ lat: task.coordinate.latitude, lng: task.coordinate.longitude }}
            />
        ))}
    </GoogleMap>
);  

interface MapProps {
    onSelect: (task: TasksResponse) => void;
}

export const Map: FC<MapProps> = (props) => {
    const size = useContext(ResponsiveContext);
    const app = useContext(AppContext);
    const [ center, setCenter ] = useState({
        lat: 33.425522,
        lng: -111.941254
    });
    const mapRef = createRef<GoogleMap>();

    const onBoundsChanged = debounce(() => {
        const bounds = mapRef.current?.getBounds();
        const northEast = bounds?.getNorthEast();
        const southWest = bounds?.getSouthWest();

        app.dispatch({ type: 'SetBounds', payload: {
            ne: northEast,
            sw: southWest,
            nw: {
                latitude: northEast?.lat(),
                longitude: southWest?.lng()
            },
            se: {
                latitude: southWest?.lat(),
                longitude: northEast?.lng()
            }
        }})
    }, 250);

    return (
        <div style={{ height: size == "small" ? "calc(100vh - 143px)" : "calc(100vh - 75px)", width: "100%" }}>
            <MyMapComponent
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                center={center}
                tasks={app.state.tasks}
                mapRef={mapRef}
                onSelect={props.onSelect}
                onBoundsChanged={onBoundsChanged}
            />
        </div>
    );
}