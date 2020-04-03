export interface ApiClient {
    get<T = unknown>(uri: string): Promise<T>;
    getWithAuth<T = unknown>(uri: string, headers: any): Promise<T>;
    post<T = unknown>(uri: string, body: any): Promise<T>;
    postWithAuth<T = unknown>(uri: string, body: any, headers: any): Promise<T>;
    put<T = unknown>(uri: string, body: any): Promise<T>;
    putWithAuth<T = unknown>(uri: string, body: any, headers: any): Promise<T>;
}
