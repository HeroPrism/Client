import { Coordinate } from "./TasksResponse";

export interface MyOffersResponseResult {
    tasks: MyOffersResponse[];
}

export interface MyOffersResponse {
    createDateTime: string;
    description: string;
    id: string;
    title: string;
    zipCode: string;
    coordinate: Coordinate;
    category: string;
    status: string;
    requester: Requester;
}

export interface Requester {
    chatId: string;
    userId: string;
    score: number;
    pictureId: number;
    firstName: string;
}