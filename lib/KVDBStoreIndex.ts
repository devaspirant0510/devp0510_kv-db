import {DMLOperator} from "./DMLOperator";

export async function transactionMapper<T>(request: IDBRequest): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(request.error);
        };
    });
}

export class KVDBStoreIndex implements DMLOperator {
    private store: IDBObjectStore;

    constructor(store: IDBObjectStore) {
        this.store = store
    }

    createIndex(indexName: string, keyPath: string, unique: boolean = false, multiEntry: boolean = false) {
        this.store.createIndex(indexName, keyPath, {unique, multiEntry});
    }



    async createOne<T>(value: any, key?: IDBValidKey): Promise<T | undefined> {
        const addReq = this.store.add(value, key);
        const addResultKey = await transactionMapper<IDBValidKey>(addReq);
        return this.readOne(addResultKey);
    }

    async deleteAll(): Promise<IDBValidKey[] | undefined> {
        throw new Error("not implemented yet")
    }

    async deleteOne<T>(key: IDBValidKey): Promise<IDBValidKey | undefined> {
        const toRemoveKey = key;
        const checkValid = await transactionMapper<T>(this.store.get(key))
        if(!checkValid) throw new Error("The key does not exist.")
        await transactionMapper<unknown>(this.store.delete(key));
        return toRemoveKey
    }

    async readAll<T>(): Promise<T[] | undefined> {
        const readAllReq = this.store.getAll();
        return await transactionMapper<T[]>(readAllReq);
    }

    async readOne<T>(value: IDBValidKey): Promise<T | undefined> {
        const readOneReq = this.store.get(value)
        return await transactionMapper<T>(readOneReq)
    }

    async updateOne<T>(key: IDBValidKey, toUpdateValue: T): Promise<IDBValidKey | undefined> {
        const result = this.store.put(toUpdateValue,key)
        return await transactionMapper(result)
    }


}