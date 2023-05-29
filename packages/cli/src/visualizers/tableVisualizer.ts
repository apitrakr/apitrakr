import chalk from 'chalk';
import { table } from 'table';
import { SingleRunData } from '@apitrakr/core/lib/models/responseData';
import { durationText, statusCodeText } from '@apitrakr/core/lib/helpers/textHelper';

export const visualizeTable = (values: number[], runData: SingleRunData[]) => {

    const tableData: string[][] = [];

    tableData.push([chalk.bold('Iteration'), chalk.bold('Duration (ms)'), chalk.bold('Status')]);
    
    for (let i = 0; i < values.length; i++) {
        tableData.push([chalk.gray('# ' + i.toString()), 
        durationText(values[i]),
        statusCodeText(runData[i].status.toString() + " (" + runData[i].statusText  +")")]);
    }

    console.log(table(tableData, { drawHorizontalLine: (lineIndex, rowCount) => lineIndex === 0 || lineIndex === 1 || lineIndex == rowCount }));
}