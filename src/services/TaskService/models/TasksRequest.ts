export interface TasksRequest {
    bounds: Bounds;
}

export interface Bounds {
    nw: Coordinate;
    ne: Coordinate;
    sw: Coordinate;
    se: Coordinate;
}

export interface Coordinate {
    latitude: number;
    longitude: number;
}