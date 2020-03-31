import { ApiClient } from "./ApiClient";

export interface JsonClientOptions {
    basePath?: string;
}

const DEFAULT_OPTIONS = {
    basePath: "https://50992717.ngrok.io"
};

const DEFAULT_HEADERS: HeadersInit = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};

export class JsonClient implements ApiClient {
    private readonly options: JsonClientOptions = DEFAULT_OPTIONS;

    public constructor(options?: JsonClientOptions) {
        this.options = { ...DEFAULT_OPTIONS, ...options };
    }

    public get = <T>(uri: string): Promise<T> => this.send<T>(uri, { method: "GET" });

    public post = <TResponse = unknown>(uri: string, body: any) =>
        this.send<TResponse>(uri, { method: "POST", body: JSON.stringify(body) });

    public postWithAuth = <TResponse = unknown>(uri: string, body: any, headers: any) =>
        this.send<TResponse>(uri, { method: "POST", body: JSON.stringify(body), headers });

    private async send<T>(uri: string, request: RequestInit): Promise<T> {
        const response = await fetch(`${this.options.basePath}/${uri}`, {
            ...request,
            headers: { ...DEFAULT_HEADERS, ...request.headers }
        });

        const content = await response.json();

        if (!response.ok) {
            throw Error(`Request to '${uri}' failed with status code ${response.status}.`);
        }

        return content.data || content;
    }
}
