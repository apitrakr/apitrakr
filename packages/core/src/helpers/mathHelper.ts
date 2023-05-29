export const evaluateMathStats = (values: number[]): [number, number, number, number, number] => {
    let median = 0;
    let n = values.length;
    let med = Math.floor(n / 2);
    if (n % 2 != 0) {
        median = values[med];
    } else {
        median = (values[med - 1] + values[med]) / 2.0
    }

    let std = getVarianceAndStdDev(values);

    return [median, Math.min(...values), Math.max(...values), std[0], std[1]];

}


 const getVarianceAndStdDev = (arr: number[]) : [number, number] => {
    const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
    const variance = arr
        .reduce((acc : number[], val : number) => acc.concat((val - mean) ** 2), [])
        .reduce((acc : number, val : number) => acc + val, 0) /
        (arr.length - 1);
     

    return [variance, Math.sqrt(variance)];
}