import { responseData } from "@apitrakr/core";
import { visualizeChart } from "./chartVisualizer";
import { visualizeTable } from "./tableVisualizer";
import { visualizeText } from "./textVisualizer";

export const visualize = (dataPoints: responseData.SingleRunData[], values: number[], type: string) => {

   

    switch(type) {
        case "chart": {
            visualizeChart(values);
            break;
        }
        case "text": {
            visualizeText(values);
            break;
        }
        case "table": {
            visualizeTable(values, dataPoints);
            break;
        }
    }
};