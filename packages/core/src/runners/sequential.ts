import { IInputArgs } from "../models/inputArgs";
import { ResponseData, SingleRunData } from "../models/responseData";
import { executeHttpRequest } from "../httpClient";
import { getSizeKb } from "../helpers/responseHelper";
import { CallbackType } from "../models/callbackModel";

export const runSequential = async (input: IInputArgs, callback: (type: CallbackType, responseData?: string) => void): Promise<ResponseData> => {

    const runs: SingleRunData[] = [];
    const failedRuns: SingleRunData[] = [];
    const start = new Date().getMilliseconds();

    for (let x = 0; x < input.iterations; x++) {
        const currStart = new Date().getMilliseconds();
        try {
            const httpResponse = await executeHttpRequest(input);
            const currEnd = new Date().getMilliseconds();
            runs.push({ duration: Math.abs(currEnd - currStart), status: httpResponse.status, response: httpResponse.response, statusText: httpResponse.statusText, sizeKB: getSizeKb(httpResponse.response) });
            callback(CallbackType.SUCCESS_CALLBACK, httpResponse.response);
        } catch (err: any) {
            const currEnd = new Date().getMilliseconds();
            failedRuns.push({  duration: Math.abs(currEnd - currStart),status: err.status, statusText: err.statusText, sizeKB: 0});
            callback(CallbackType.FAILURE_CALLBACK);
        }
    }

    const end = new Date().getMilliseconds();

    return {
        totalDuration: (end - start),
        dataPoints: runs,
        failedRuns: failedRuns
    };

};