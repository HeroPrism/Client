import { JsonClient } from "../JsonClient";
import { ApiClient } from "../ApiClient";
import { TasksRequest } from "./models/TasksRequest";
import { TasksResponse, TaskResponseResult } from "./models/TasksResponse";
import { CreateTaskRequest } from "./models/CreateTaskRequest";
import { CreateTaskResponse } from "./models/CreateTaskResponse";
import { MyRequestResponse, MyRequestResponseResult } from "./models/MyRequestsResponse";
import { OfferHelpResponse } from "./models/OfferHelpResponse";
import { OfferHelpRequest } from "./models/OfferHelpRequest";
import { TaskConversations } from "./models/TaskConversations";

export class TaskService {
    

    private api: ApiClient = new JsonClient();

    public async getChatsByTask(taskId?: string, token?: string) : Promise<TaskConversations> {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        return await this.api.getWithAuth<TaskConversations>(`tasks/${taskId}`, headers);
    }

    public async offerHelp(request: OfferHelpRequest, token?: string) : Promise<OfferHelpResponse> {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        return await this.api.postWithAuth<OfferHelpResponse>("tasks/help", request, headers);
    }

    public async deleteTask(taskId?: any, token?: string) : Promise<boolean> {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        const result =  await this.api.postWithAuth("tasks/delete", taskId, headers);

        return true;
    }

    public async createTask(request: CreateTaskRequest, token?: string) : Promise<CreateTaskResponse> {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        return await this.api.postWithAuth<CreateTaskResponse>("tasks", request, headers);
    }

    public async getTasks(request: TasksRequest) : Promise<TasksResponse[]> {
        var response = await this.api.post<TaskResponseResult>("tasks/search", request);

        return response.tasks;
    }

    public async getRequests(token?: string) : Promise<MyRequestResponse[]> {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        var response = await this.api.getWithAuth<MyRequestResponseResult>("tasks/requests", headers);

        return response.tasks;
    }

    public async getOffers(token?: string) : Promise<TasksResponse[]> {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        //var response = await this.api.postWithAuth<TaskResponseResult>("tasks/search", request, headers);

        return [
            {
                createDateTime: "4/3/2020",
                description: "description",
                id: "id",
                title: "title",
                requester: {
                    firstName: "name",
                    score: 1,
                    userType: "Individual",
                    pictureId: 1
                },
                zipCode: "zipCode",
                coordinate: {
                    latitude: 33.4234,
                    longitude: -111.88
                },
                category: "category",
                status: "New"
            },
            {
                createDateTime: "4/3/2020",
                description: "description",
                id: "id",
                title: "title",
                requester: {
                    firstName: "name",
                    score: 1,
                    userType: "Individual",
                    pictureId: 1
                },
                zipCode: "zipCode",
                coordinate: {
                    latitude: 33.4234,
                    longitude: -111.88
                },
                category: "category",
                status: "New"
            },
            {
                createDateTime: "4/3/2020",
                description: "description",
                id: "id",
                title: "title",
                requester: {
                    firstName: "name",
                    score: 1,
                    userType: "Individual",
                    pictureId: 1
                },
                zipCode: "zipCode",
                coordinate: {
                    latitude: 33.4234,
                    longitude: -111.88
                },
                category: "category",
                status: "New"
            }
        ];
    }
}
