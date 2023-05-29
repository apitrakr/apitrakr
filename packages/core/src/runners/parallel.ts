import { IInputArgs } from "../models/inputArgs.js";
import { ResponseData, SingleRunData } from "../models/responseData.js";
import { executeHttpRequest } from "../httpClient.js";
import { CallbackType } from "../models/callbackModel.js";

export const runParallel = async (input: IInputArgs, callback: (type: CallbackType, responseData?: string) => void): Promise<ResponseData> => {

    const results: SingleRunData[] = [];
    const failedRuns: SingleRunData[] = [];
    const start = new Date().getMilliseconds();

    const runs = Array.from({ length: input.iterations }).map(async () => {

        const currStart = new Date().getMilliseconds();
        try {
            const reqResp = await executeHttpRequest(input);
            const currEnd = new Date().getMilliseconds();
            results.push({ duration: Math.abs(currEnd - currStart), status: reqResp.status, response: reqResp.response, statusText: reqResp.statusText });
            callback(CallbackType.SUCCESS_CALLBACK, reqResp.response);
        } catch (err : any) {
            const currEnd = new Date().getMilliseconds();
            failedRuns.push({  duration: Math.abs(currEnd - currStart),status: err.status, statusText: err.statusText});
            callback(CallbackType.FAILURE_CALLBACK);
        }
    });

    await Promise.all(runs);

    const end = new Date().getMilliseconds();

    return { dataPoints: results, totalDuration: (end - start), failedRuns: failedRuns };

}