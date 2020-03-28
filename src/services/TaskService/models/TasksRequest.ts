export interface TasksRequest {
    bounds: Bounds;
}

export interface Bounds {
    nw: Coordinate;
    se: Coordinate;
}

export interface Coordinate {
    latitude: number;
    longitude: number;
}