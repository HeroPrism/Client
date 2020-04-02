import { JsonClient } from "../JsonClient";
import { ApiClient } from "../ApiClient";
import { TasksRequest } from "./models/TasksRequest";
import { TasksResponse, TaskResponseResult } from "./models/TasksResponse";
import { CreateTaskRequest } from "./models/CreateTaskRequest";
import { CreateTaskResponse } from "./models/CreateTaskResponse";

export class TaskService {
    

    private api: ApiClient = new JsonClient();

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
}
