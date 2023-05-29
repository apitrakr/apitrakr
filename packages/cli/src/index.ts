#! /usr/bin/env node

import ora from 'ora';
import chalk from 'chalk';
import { visualize } from './visualizers/visualizer';
import { Command } from 'commander';
import { visualizeStats } from './visualizers/statsVisualizer';
import { evaluateMathStats } from '@apitrakr/core/src/helpers/mathHelper';
import { IInputArgs } from '@apitrakr/core/src/models/inputArgs';
import { CallbackType } from '@apitrakr/core/src/models/callbackModel';
import { ResponseData } from '@apitrakr/core/src/models/responseData';
import { executeRun } from '@apitrakr/core/src/runners/runner';

const program = new Command();

console.log('\n');
console.log("--------------------------------------------------------");
console.log("-       APITrakr CLI - API testing made easy           -");
console.log("--------------------------------------------------------");
console.log('\n');

program
    .version("1.0.0")
    .description("APITrakr CLI")
    .requiredOption("-u, --url <value>", "The URL of the request")
    .option("-m, --method <value>", "The method of the request (GET, POST, HEAD, etc..)")
    .option("-s, --visualization <value>", "Shows a visualization related to the current execution run. table, chart, text")
    .option("-n, --iterations <value>", "The number of iterations")
    .option("-p, --payload <value>", "The payload")
    .option("-e, --headers <value>", "The headers")
    .option("-x, --execution <value>", "The execution type. sequential or parallel")
    .option("-t, --timeout <value>", "Max timeout in ms")
    .option("-h, --help", "Show help")
    .action(async (data) => {
        const args: IInputArgs = {
            url: data.url,
            method: data.method,
            visual: data.visualization,
            iterations: data.iterations,
            payloadFile: data.payload,
            timeout: data.timeout,
            execution: data.execution,
            headersFile: data.headers
        };

        const spinner = ora(
            {
                text: chalk.cyan('Processing...'),
                color: "cyan",
                spinner: 'dots'
            }
        ).start();

        let results: ResponseData | null = await executeRun(args, (type: CallbackType, resp?: string) => { });

        spinner.stop();

        if (results) {

            if (results.dataPoints.length > 0) {
                const values: number[] = results.dataPoints.map((x) => x.duration);
                visualize(results.dataPoints, values, args.visual);

                const stats = evaluateMathStats(values);
                visualizeStats(stats, args);
            }

            if (results.failedRuns && results.failedRuns.length > 0) {
                console.log(results.failedRuns);
                const values: number[] = results.failedRuns.map((x) => x.duration);
                visualize(results.failedRuns, values, args.visual);
            }
        }
    })
    .parse(process.argv);