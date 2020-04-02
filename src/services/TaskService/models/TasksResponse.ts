import { User } from "./User";

export interface TaskResponseResult {
    tasks: TasksResponse[];
}

export interface TasksResponse {
    createdDateTime: string;
    description: string;
    id: string;
    title: string;
    user: User;
    zipCode: string;
    coordinate: Coordinate;
    category: string;
    status: string;
}

export interface Coordinate {
    longitude: number;
    latitude: number;
}