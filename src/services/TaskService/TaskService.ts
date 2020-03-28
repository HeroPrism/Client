import { JsonClient } from "../JsonClient";
import { ApiClient } from "../ApiClient";
import { TasksRequest } from "./models/TasksRequest";
import { TasksResponse } from "./models/TasksResponse";

export class BookingService {
    private api: ApiClient = new JsonClient({ basePath: "/api/tasks" });

    public async getTasks(request: TasksRequest) {
        //const response = await this.api.post<TasksResponse>("", request);

        return [
            {
                date: Date(),
                description: "I have a dog who eats mad treats yo.",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "Need Dog Treats",
                userName: "astro1986",
                location: "Tempe, AZ"
            },
            {
                date: Date(),
                description: "I poop alot",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "TP Please",
                userName: "plum1986",
                location: "Gilbert, AZ"
            },
            {
                date: Date(),
                description: "I love ice cream.",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "Ice Cream",
                userName: "ice1986",
                location: "Mesa, AZ"
            },
            {
                date: Date(),
                description: "I need my meds picked up",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "Need Medicine",
                userName: "doctor1986",
                location: "Tempe, AZ"
            },
            {
                date: Date(),
                description: "My power is out and i need a flash light",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "Flashlight needed",
                userName: "lamp1986",
                location: "Tempe, AZ"
            },
            {
                date: Date(),
                description: "I have a dog who eats mad treats yo.",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "Need Dog Treats",
                userName: "astro1986",
                location: "Tempe, AZ"
            },
            {
                date: Date(),
                description: "I poop alot",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "TP Please",
                userName: "plum1986",
                location: "Gilbert, AZ"
            },
            {
                date: Date(),
                description: "I love ice cream.",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "Ice Cream",
                userName: "ice1986",
                location: "Mesa, AZ"
            },
            {
                date: Date(),
                description: "I need my meds picked up",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "Need Medicine",
                userName: "doctor1986",
                location: "Tempe, AZ"
            },
            {
                date: Date(),
                description: "My power is out and i need a flash light",
                id: "23542345",
                pictureUrl: "https://via.placeholder.com/75",
                title: "Flashlight needed",
                userName: "lamp1986",
                location: "Tempe, AZ"
            }
        ];
    }
}
