import { HttpResponseData } from "./models/httpResponseData.js";
import { IInputArgs } from "./models/inputArgs.js";
 

export const executeHttpRequest = async (input: IInputArgs): Promise<HttpResponseData> => {

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), input.timeout);
    const reqHeaders : Record<string, string> = {};

    try {

        reqHeaders["User-Agent"] = `apitrakr/1.0.0`;
        if (input.headers) {
            Object.entries(input.headers).forEach(([key, value]) => reqHeaders[key] = value);
        }

        if (input.payload) {
            console.log(input.payload);
        }

        const req = new Request(
            input.url,
            {
                method: input.method,
                body: input.payload,
                headers: reqHeaders
            }
        );

        const fetchResp = await fetch(req, { signal: controller.signal});

        if (!fetchResp.ok) {
            throw new ResponseError('Bad fetch response', fetchResp);
        }

        const returnDataTxt = await fetchResp.text();
        return { status: fetchResp.status, statusText: fetchResp.statusText, response: returnDataTxt };

    } catch (err: any) {
        
        if (err instanceof TypeError) {
            return { status: 500, statusText: "Internal Server Error", response: "" };
        }

        return { status: err.response.status, statusText:err.response.statusText,  response: "" };
    } finally {
        clearTimeout(timeoutId);
    }
};

class ResponseError extends Error {
    response: Response;
    constructor(message: string, res: Response) {
        super(message);
        this.response = res;
    }
}