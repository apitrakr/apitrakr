export interface ResponseData {
    totalDuration: number;
    dataPoints: SingleRunData[],
    failedRuns?: SingleRunData[]
};

export interface SingleRunData {
    duration: number;
    status: number;
    statusText: string;
    response?: string;
}