import { ResponseData } from "../models/responseData";
import * as sequentialRunner from "./sequential";
import * as parallelRunner from "./parallel";
import { IInputArgs } from "../models/inputArgs";
import { CallbackType } from "../models/callbackModel";
import { readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from "process";

export const executeRun = async (args: IInputArgs, callback: (type: CallbackType, resp?: string) => void ) : Promise<ResponseData | null> => {

    let results: ResponseData | null = null;
    
    if (args.headersFile) {
        const file = readFileSync(join(cwd(), args.headersFile), 'utf-8');
        args.headers = JSON.parse(file);
    }

    if (args.payloadFile && canHaveBody(args.method)) {
        const file = readFileSync(join(cwd(), args.payloadFile), 'utf-8');
        args.payload = file;
    }

    switch (args.execution) {
        case "sequential":
            results = await sequentialRunner.runSequential(args, callback);
            break;
        case "parallel":
            results = await parallelRunner.runParallel(args, callback);
            break;
    }

    return results;
}

const canHaveBody =(method: string) => {
    return method !== "GET" && method !== "HEAD"; 
};