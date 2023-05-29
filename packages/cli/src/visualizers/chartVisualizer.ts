import asciichart from "asciichart";

export const visualizeChart = (values: number[]) => {
    console.log('\n');
    console.log(asciichart.plot(values, {
        offset: 2,
        height: 10,
        colors: [asciichart.cyan, asciichart.blue]
    }));
    console.log('\n');
}