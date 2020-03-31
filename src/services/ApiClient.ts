export interface ApiClient {
    get<T = unknown>(uri: string): Promise<T>;
    post<T = unknown>(uri: string, body: any): Promise<T>;
    postWithAuth<T = unknown>(uri: string, body: any, headers: any): Promise<T>;
}
