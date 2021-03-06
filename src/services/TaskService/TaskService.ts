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
import { MyOffersResponse, MyOffersResponseResult } from "./models/MyOffersResponse";

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

        await this.api.postWithAuth("tasks/delete", taskId, headers);

        return true;
    }

    public async completeTask(chatId?: any, token?: string) : Promise<boolean> {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        await this.api.postWithAuth("tasks/complete", chatId, headers);

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

    public async getOffers(token?: string) : Promise<MyOffersResponse[]> {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        var response = await this.api.getWithAuth<MyOffersResponseResult>("tasks/offers", headers);

        return response.tasks;
    }
}
