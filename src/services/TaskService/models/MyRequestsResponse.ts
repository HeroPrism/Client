import { Coordinate } from "./TasksResponse";

export interface MyRequestResponseResult {
    tasks: MyRequestResponse[];
}

export interface MyRequestResponse {
    createDateTime: string;
    description: string;
    id: string;
    title: string;
    zipCode: string;
    coordinate: Coordinate;
    category: string;
    status: string;
}