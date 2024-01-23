export async function asyncForEach<T>(
    array: Array<T>,
    callback: (item: T, index: number, og: T[]) => void
): Promise<void> {
    for (let index = 0; index < array.length; index++) {
        callback(array[index], index, array);
    }
}
