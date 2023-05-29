#! /usr/bin/env node

import ora from 'ora';
import chalk from 'chalk';
import { visualize } from './visualizers/visualizer';
import { Command } from 'commander';
import { visualizeStats } from './visualizers/statsVisualizer';
import { evaluateMathStats } from '@apitrakr/core';
import { IInputArgs } from '@apitrakr/core'; 
import { CallbackType } from '@apitrakr/core';
import { ResponseData } from '@apitrakr/core';
import { runner } from '@apitrakr/core';
import { version } from "../package.json";

const program = new Command();

console.log('\n');
console.log("--------------------------------------------------------");
console.log(`-       APITrakr CLI [${version}] - API testing tool        -`);
console.log("--------------------------------------------------------");
console.log('\n');

program
    .version(version)
    .description(`APITrakr CLI v${version}`)
    .option("-u, --url <value>", "The URL of the request")
    .option("-m, --method <value>", "The method of the request (GET, POST, HEAD, etc..)", "GET")
    .option("-s, --visualization <value>", "Shows a visualization related to the current execution run. table, chart, text", "chart")
    .option("-n, --iterations <value>", "The number of iterations", "30")
    .option("-p, --payload <value>", "The payload file path")
    .option("-e, --headers <value>", "The headers file path")
    .option("-x, --execution <value>", "The execution type (sequential or parallel)", "sequential")
    .option("-t, --timeout <value>", "Max timeout in ms", "30000")
    .option("-h, --help", "Show help")
    .action(async (data) => {

        if (data.help) {
            program.outputHelp();
            return;
        }

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

        let results: ResponseData | null = await runner.executeRun(args, (type: CallbackType, resp?: string) => { });

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
