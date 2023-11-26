export interface DMLOperator{
    createOne<T>(value:any,key?:IDBValidKey):Promise<T|undefined>;
    readOne<T>(value:IDBValidKey):Promise<T|undefined>;
    readAll<T>():Promise<T[]|undefined>;
    updateOne<T>(key:IDBValidKey,toUpdateValue:T):Promise<IDBValidKey|undefined>;
    deleteOne(key:IDBValidKey):Promise<IDBValidKey|undefined>;
    deleteAll():Promise<IDBValidKey[]|undefined>;
}