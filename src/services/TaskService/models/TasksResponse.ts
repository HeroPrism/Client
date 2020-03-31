import { User } from "./User";

export interface TasksResponse {
    date: string;
    description: string;
    id: string;
    pictureUrl?: string;
    title: string;
    user: User;
    location: string;
    coordinates: Coordinate;
}

export interface Coordinate {
    lat: number;
    lng: number;
}