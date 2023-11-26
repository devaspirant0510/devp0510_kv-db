export default class CreateKVDB {
    private dbRequest;
    private dbname;
    private version;
    constructor(dbname: string, version?: number);
    /**
     *
     * @param storeName to create store name
     * @param keyPath primary key name
     * @param autoincrement
     */
    createStore(storeName: string, keyPath: string, autoincrement?: boolean): Promise<IDBObjectStore>;
    getStore(storeName: string, options?: string): Promise<IDBObjectStore>;
}
