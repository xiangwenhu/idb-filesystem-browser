export async function asyncIteratorToArray<T = unknown>(asyncIterator: AsyncGenerator<T>): Promise<T[]> {
    const result: T[] = [];
    for await (const item of asyncIterator) {
        result.push(item);
    }
    return result;
}