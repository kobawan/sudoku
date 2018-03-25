export const compose = (...fns: Function[]) => fns.reduce(
    (f, g) => (...args: any[]) => f(g(...args))
);

export const removeDuplicates = <T>(arr: T[]) => {
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

export interface Listener<E = Event> {
    type: string;
    callback: (e: E) => void;
}

export const addListener = <K extends keyof WindowEventMap>(
    targets: Element[],
    type: K,
    callback: (e: WindowEventMap[K]) => void
): Listener<WindowEventMap[K]> => {
    targets.forEach(target => target.addEventListener(type, callback));
    return { type, callback };
};

export const removeListener = (listeners: Listener[], targets: Element[]): undefined => {
    listeners.forEach(({ type, callback }) => {
        targets.forEach(
            target => target.removeEventListener(type, callback)
        );
    });
    return undefined;
};
