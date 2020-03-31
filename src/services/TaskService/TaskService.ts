import { JsonClient } from "../JsonClient";
import { ApiClient } from "../ApiClient";
import { TasksRequest } from "./models/TasksRequest";
import { TasksResponse } from "./models/TasksResponse";
import { CreateTaskRequest } from "./models/CreateTaskRequest";
import { CreateTaskResponse } from "./models/CreateTaskResponse";

export class TaskService {
    

    private api: ApiClient = new JsonClient();

    public async createTask(request: CreateTaskRequest, token?: string) : Promise<CreateTaskResponse> {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        //return await this.api.postWithAuth<CreateTaskResponse>("hops", request, headers);
        return {
            id: "23423423"
        }
    }

    public async getTasks(request: TasksRequest) : Promise<TasksResponse[]> {
        //const response = await this.api.post<TasksResponse[]>("tasks", request);

        return [
            {
                date: Date(),
                description: "I have a dog who eats mad treats yo. I have a dog who eats mad treats yo. I have a dog who eats mad treats yo. I have a dog who eats mad treats yo. I have a dog who eats mad treats yo.",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "Need Dog Treats",
                user: {
                    id: "2343",
                    name: "Chris",
                    score: 22,
                    joinedDate: "3/27/2020"
                },
                location: "Tempe, AZ",
                coordinates: {
                    lat: 33.425522,
                    lng: -111.941254
                }
            },
            {
                date: Date(),
                description: "I poop alot",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "TP Please",
                user: {
                    id: "2343",
                    name: "Chris",
                    score: 22,
                    joinedDate: "3/27/2020"
                },
                location: "Gilbert, AZ",
                coordinates: {
                    lat: 33.5255,
                    lng: -111.9200
                }
            },
            {
                date: Date(),
                description: "I love ice cream.",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "Ice Cream",
                user: {
                    id: "2343",
                    name: "Chris",
                    score: 22,
                    joinedDate: "3/27/2020"
                },
                location: "Mesa, AZ",
                coordinates: {
                    lat: 33.4455,
                    lng: -111.8920
                }
            },
            {
                date: Date(),
                description: "I need my meds picked up",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "Need Medicine",
                user: {
                    id: "2343",
                    name: "Chris",
                    score: 22,
                    joinedDate: "3/27/2020"
                },
                location: "Tempe, AZ",
                coordinates: {
                    lat: 33.1255,
                    lng: -111.7400
                }
            },
            {
                date: Date(),
                description: "My power is out and i need a flash light",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "Flashlight needed",
                user: {
                    id: "2343",
                    name: "Chris",
                    score: 22,
                    joinedDate: "3/27/2020"
                },
                location: "Tempe, AZ",
                coordinates: {
                    lat: 33.4225,
                    lng: -111.9100
                }
            },
            {
                date: Date(),
                description: "I have a dog who eats mad treats yo.",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "Need Dog Treats",
                user: {
                    id: "2343",
                    name: "Chris",
                    score: 22,
                    joinedDate: "3/27/2020"
                },
                location: "Tempe, AZ",
                coordinates: {
                    lat: 33.3995,
                    lng: -111.9510
                }
            },
            {
                date: Date(),
                description: "I poop alot",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "TP Please",
                user: {
                    id: "2343",
                    name: "Chris",
                    score: 22,
                    joinedDate: "3/27/2020"
                },
                location: "Gilbert, AZ",
                coordinates: {
                    lat: 33.4145,
                    lng: -111.9377
                }
            },
            {
                date: Date(),
                description: "I love ice cream.",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "Ice Cream",
                user: {
                    id: "2343",
                    name: "Chris",
                    score: 22,
                    joinedDate: "3/27/2020"
                },
                location: "Mesa, AZ",
                coordinates: {
                    lat: 33.3915,
                    lng: -111.9480
                }
            }
        ]
    }
}
