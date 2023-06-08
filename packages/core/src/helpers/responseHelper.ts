export const getSizeKb = (input: string): number => {
    const b = input.length * 2;
    return (b / 1024);
}