import chalk from "chalk";

export const durationText = (duration: number): string => {

    const normalized = Math.round(duration / 1000);
    switch (normalized) {
        case 0:
            return chalk.green(duration + " ms");
        case 1:
            return chalk.yellow(duration + " ms");
        default:
            return chalk.redBright(duration + " ms");

    }
};


export const statusCodeText = (status: string): string => {
    if (status.startsWith("2")) {
        return chalk.green(status);
    } else if (status.startsWith("4")) {
        return chalk.yellow(status);
    }

    return chalk.redBright(status);
}