import { DMLOperator } from "./DMLOperator";
export declare function transactionMapper<T>(request: IDBRequest): Promise<T>;
export declare class KVDBStoreIndex implements DMLOperator {
    private store;
    constructor(store: IDBObjectStore);
    createIndex(indexName: string, keyPath: string, unique?: boolean, multiEntry?: boolean): void;
    createOne<T>(value: any, key?: IDBValidKey): Promise<T | undefined>;
    deleteAll(): Promise<IDBValidKey[] | undefined>;
    deleteOne<T>(key: IDBValidKey): Promise<IDBValidKey | undefined>;
    readAll<T>(): Promise<T[] | undefined>;
    readOne<T>(value: IDBValidKey): Promise<T | undefined>;
    updateOne<T>(key: IDBValidKey, toUpdateValue: T): Promise<IDBValidKey | undefined>;
}
