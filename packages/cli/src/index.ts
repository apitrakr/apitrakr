#! /usr/bin/env node

import ora from 'ora';
import chalk from 'chalk';
import { visualize } from './visualizers/visualizer';
import { Command } from 'commander';
import { visualizeStats } from './visualizers/statsVisualizer';
import { IInputArgs, mathHelper, responseData, callbackModel, runner } from '@apitrakr/core';

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

        let results: responseData.ResponseData | null = await runner.executeRun(args, (type: callbackModel.CallbackType, resp?: string) => { });

        spinner.stop();

        if (results) {

            if (results.dataPoints.length > 0) {
                const values: number[] = results.dataPoints.map((x) => x.duration);
                visualize(results.dataPoints, values, args.visual);

                const stats = mathHelper.evaluateMathStats(values);
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