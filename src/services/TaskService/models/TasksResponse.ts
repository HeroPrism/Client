import { User } from "./User";

export interface TaskResponseResult {
    tasks: TasksResponse[];
}

export interface TasksResponse {
    createDateTime: string;
    description: string;
    id: string;
    title: string;
    requester: User;
    zipCode: string;
    coordinate: Coordinate;
    category: string;
    status: string;
}

export interface Coordinate {
    longitude: number;
    latitude: number;
}