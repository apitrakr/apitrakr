import { SingleRunData } from "@apitrakr/core/src/models/responseData";
import { visualizeChart } from "./chartVisualizer";
import { visualizeTable } from "./tableVisualizer";
import { visualizeText } from "./textVisualizer";

export const visualize = (dataPoints: SingleRunData[], values: number[], type: string) => {

   

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