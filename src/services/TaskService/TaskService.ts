import { JsonClient } from "../JsonClient";
import { ApiClient } from "../ApiClient";
import { TasksRequest } from "./models/TasksRequest";
import { TasksResponse } from "./models/TasksResponse";
import { CreateTaskRequest } from "./models/CreateTaskRequest";
import { CreateTaskResponse } from "./models/CreateTaskResponse";

export class TaskService {
    private api: ApiClient = new JsonClient({ basePath: "/api" });

    public async createTask(request: CreateTaskRequest) : Promise<CreateTaskResponse> {
        //await this.api.post<CreateTaskResponse>("tasks", request)

        return {
            id: "12345"
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
                location: "Tempe, AZ"
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
                location: "Gilbert, AZ"
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
                location: "Mesa, AZ"
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
                location: "Tempe, AZ"
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
                location: "Tempe, AZ"
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
                location: "Tempe, AZ"
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
                location: "Gilbert, AZ"
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
                location: "Mesa, AZ"
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
                location: "Tempe, AZ"
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
                location: "Tempe, AZ"
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
                location: "Tempe, AZ"
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
                location: "Gilbert, AZ"
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
                location: "Mesa, AZ"
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
                location: "Tempe, AZ"
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
                location: "Tempe, AZ"
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
                location: "Tempe, AZ"
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
                location: "Gilbert, AZ"
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
                location: "Mesa, AZ"
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
                location: "Tempe, AZ"
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
                location: "Tempe, AZ"
            }
        ];
    }
}
