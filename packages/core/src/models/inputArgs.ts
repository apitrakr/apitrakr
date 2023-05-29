export interface IInputArgs {
    url: string;
    method: string;
    timeout: number;
    payload?: string;
    payloadFile?: string;
    visual: string;
    iterations: number;
    execution: string;
    headers?: Record<string, string>;
    headersFile?: string;
}
