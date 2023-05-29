import chalk from "chalk";
import { IInputArgs } from "@apitrakr/core/src/models/inputArgs";

export const visualizeStats = (stats: [number, number, number, number, number], args: IInputArgs) => {
    console.log(`✅ ${chalk.green(`${args.iterations} executions`)} complete on:`);
    console.log(`${chalk.gray(`${args.url}`)}`);
    console.log('\n');
    console.log(chalk.green(`✅ Execution stats`));
    console.log(chalk.grey(`  ➡️  Median: `) + chalk.white(`${stats[0]} ms`));
    console.log(chalk.grey(`  ➡️  Min: `) + chalk.white(`${stats[1]} ms`));
    console.log(chalk.grey(`  ➡️  Max: `) + chalk.white(`${stats[2]} ms`));
    //console.log(chalk.grey(`  ➡️  Variance: `) + chalk.white(`${stats[3].toFixed(2)} ms`));
    console.log(chalk.grey(`  ➡️  StdDev: `) + chalk.white(`${stats[4].toFixed(2)} ms`));
    console.log('\n');
};