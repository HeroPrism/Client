import React, { FC } from 'react';
import { Marker } from "react-google-maps"
import { TasksResponse } from '../../services/TaskService/models/TasksResponse';

interface MapMarkerProps {
    task: TasksResponse;
    onSelect: (task: TasksResponse) => void;
}

export const MapMarker: FC<MapMarkerProps> = (props) => {
    const onMarkerClick = () => {
        console.log('asdfasdf')
        props.onSelect(props.task);
    };

    return (
        <Marker
            onClick={onMarkerClick}
            position={{ lat: props.task.coordinate.latitude, lng: props.task.coordinate.longitude }}
            {...props}
        />
    );
}