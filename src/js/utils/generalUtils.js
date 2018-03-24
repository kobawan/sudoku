export const compose = (...fns) => fns.reduce(
    (f, g) => (...args) => f(g(...args))
);

export const removeDuplicates = (arr) => {
    if (arr.length !== 1) {
        for (let pos = 0; pos < arr.length; pos++) {
            for (let next = 1; next < arr.length - pos; next++) {
                if (arr[pos] === arr[pos+next]) {
                    arr.splice(pos + next, 1);
                }
            }
        }
    }
    return arr;
};

export const addListener = (targets, type, callback) => {
    targets.forEach(target => target.addEventListener(type, callback));
    return { type, callback };
};

export const removeListener = (listeners, targets) => {
    listeners.forEach(({ type, callback }) => {
        targets.forEach(
            target => target.removeEventListener(type, callback)
        );
    });
    return [];
};
