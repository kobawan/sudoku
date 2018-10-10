export const compose = (...fns: Function[]) => fns.reduce(
    (f, g) => (...args: any[]) => f(g(...args)),
);

export const removeDuplicates = <T>(arr: T[]) => {
    if (arr.length !== 1) {
        for (let pos = 0; pos < arr.length; pos++) {
            for (let next = 1; next < arr.length - pos; next++) {
                if (arr[pos] === arr[pos + next]) {
                    arr.splice(pos + next, 1);
                }
            }
        }
    }
    return arr;
};
