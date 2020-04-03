import { JsonClient } from "../JsonClient";
import { ApiClient } from "../ApiClient";
import { GetUserResponse } from "./models/GetUserResponse";
import { CreateUserRequest } from "./models/CreateUserRequest";

export class UserService {
    private api: ApiClient = new JsonClient();

    public async get(token?: string) : Promise<GetUserResponse> {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        return await this.api.getWithAuth<GetUserResponse>("users", headers);
    }

    public async register(request: CreateUserRequest, token?: string) : Promise<any> {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        return await this.api.postWithAuth<any>("users", request, headers);
    }

    public async updateProfile(request: CreateUserRequest, token?: string) : Promise<any> {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        return await this.api.putWithAuth<any>("users", request, headers);
    }
}
