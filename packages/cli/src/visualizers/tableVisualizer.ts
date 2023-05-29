import chalk from 'chalk';
import { table } from 'table';
import { responseData } from '@apitrakr/core';
import { durationText, statusCodeText } from '../helpers/textHelper';

export const visualizeTable = (values: number[], runData: responseData.SingleRunData[]) => {

    const tableData: string[][] = [];

    tableData.push([chalk.bold('Iteration'), chalk.bold('Duration (ms)'), chalk.bold('Status')]);
    
    for (let i = 0; i < values.length; i++) {
        tableData.push([chalk.gray('# ' + i.toString()), 
        durationText(values[i]),
        statusCodeText(runData[i].status.toString() + " (" + runData[i].statusText  +")")]);
    }

    console.log(table(tableData, { drawHorizontalLine: (lineIndex, rowCount) => lineIndex === 0 || lineIndex === 1 || lineIndex == rowCount }));
}